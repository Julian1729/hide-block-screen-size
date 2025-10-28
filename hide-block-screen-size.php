<?php
/**
 * Plugin Name:       Hide Block Screen Size
 * Description:       Conditionally hide WordPress blocks based on screen sizes. Perfect for creating responsive designs without writing custom CSS.
 * Version:           0.1.0
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Author:            Julian1729
 * Author URI:        https://julianhernandez.me
 * Plugin URI:        https://github.com/Julian1729/hide-block-screen-size
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hide-block-screen-size
 * Domain Path:       /languages
 *
 * @package HideBlockScreenSize
 */
namespace HideBlockScreenSize;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue assets
 */
function init() {
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
	
	// Enqueue the JavaScript
	wp_enqueue_script(
		'conditional-block-hide',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
	
	// Enqueue the CSS
	wp_enqueue_style(
		'conditional-block-hide-style',
		plugins_url( 'build/style-index.css', __FILE__ ),
		array(),
		$asset_file['version']
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\init' );

/**
 * Collect visibility rules
 */
function hbss_collect_visibility_rule($class, $attrs) {
    static $rules = [];

    $rules[] = [
        'class' => $class,
        'attrs' => $attrs,
    ];

    $GLOBALS['hbss_visibility_rules'] = $rules;
}

/**
 * Render block filter
 */
add_filter('render_block', function ($block_content, $block) {
    // Security: Only process in admin or frontend
    if ( ! is_admin() && ! wp_doing_ajax() && ! is_singular() && ! is_home() && ! is_archive() ) {
        return $block_content;
    }

    if ( empty($block['attrs']) || ! is_array($block['attrs']) ) {
        return $block_content;
    }

    $attrs = $block['attrs'];

    // Validate attributes exist and are boolean/numeric
    $has_visibility_rules = false;
    if ( ! empty($attrs['hideOnMobile']) && is_bool($attrs['hideOnMobile']) ) {
        $has_visibility_rules = true;
    }
    if ( ! empty($attrs['hideOnTablet']) && is_bool($attrs['hideOnTablet']) ) {
        $has_visibility_rules = true;
    }
    if ( ! empty($attrs['hideOnDesktop']) && is_bool($attrs['hideOnDesktop']) ) {
        $has_visibility_rules = true;
    }
    if ( ! empty($attrs['hideOnCustomBreakpoint']) && is_bool($attrs['hideOnCustomBreakpoint']) ) {
        $has_visibility_rules = true;
    }

    if ( ! $has_visibility_rules ) {
        return $block_content;
    }

    // Sanitize custom width values if present
    if ( isset($attrs['customMinWidth']) ) {
        $attrs['customMinWidth'] = absint($attrs['customMinWidth']);
    }
    if ( isset($attrs['customMaxWidth']) ) {
        $attrs['customMaxWidth'] = absint($attrs['customMaxWidth']);
    }

    // create unique class
    $unique_class = 'hbss-vis-' . sanitize_html_class(wp_generate_uuid4());
    
    // Use WordPress HTML processor for safe HTML manipulation
    if (class_exists('WP_HTML_Tag_Processor')) {
        $processor = new \WP_HTML_Tag_Processor($block_content);
        if ($processor->next_tag()) {
            $processor->add_class($unique_class);
            $block_content = $processor->get_updated_html();
        }
    }
        
    hbss_collect_visibility_rule($unique_class, $attrs);

    return $block_content;
}, 10, 2);

/**
 * CSS generate action
 */
function hbss_output_visibility_css() {
    if ( empty($GLOBALS['hbss_visibility_rules']) ) return;

    $global_settings = wp_get_global_settings(); // WP merges theme.json here
    $bp = $global_settings['custom']['breakpoints'] ?? [];

    $mobile  = $bp['mobile']  ?? '480px';
    $tablet  = $bp['tablet']  ?? '768px';
    $desktop = $bp['desktop'] ?? '1024px';

    $css_chunks = [];

    foreach ($GLOBALS['hbss_visibility_rules'] as $rule) {
        $class = $rule['class'];
        $a = $rule['attrs'];

        if (!empty($a['hideOnMobile'])) {
            $css_chunks[] = "@media (max-width: $mobile){.$class{display:none !important;}}";
        }
        if (!empty($a['hideOnTablet'])) {
            $css_chunks[] = "@media (min-width: $mobile) and (max-width: $tablet){.$class{display:none !important;}}";
        }
        if (!empty($a['hideOnDesktop'])) {
            $css_chunks[] = "@media (min-width: $desktop){.$class{display:none !important;}}";
        }

        if (!empty($a['hideOnCustomBreakpoint'])) {
						$min_width = $a['customMinWidth'] ?? '';
						$max_width = $a['customMaxWidth'] ?? '';
						$direction = $a['customDirection'] ?? '';


						if( $min_width !== '' && $max_width !== '' && $direction === 'between' ) {
							$css_chunks[] = "@media (min-width: {$min_width}px) and (max-width: {$max_width}px){.$class{display:none !important;}}";
						} elseif ( $min_width !== '' && $direction === 'over' ) {
							$css_chunks[] = "@media (min-width: {$min_width}px){.$class{display:none !important;}}";
						} elseif ( $max_width !== '' && $direction === 'under' ) {
							$css_chunks[] = "@media (max-width: {$max_width}px){.$class{display:none !important;}}";
						}
        }
    }

    if ($css_chunks) {
        echo '<style id="hbss-visibility-rules">' . implode('', $css_chunks) . '</style>';
    }
}

add_action('wp_footer', __NAMESPACE__ . '\hbss_output_visibility_css', 100);
add_action('admin_footer', __NAMESPACE__ . '\hbss_output_visibility_css', 100); // editor iframe too