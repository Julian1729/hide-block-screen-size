=== Hide Block Screen Size ===
Contributors: julian1729
Donate link: https://github.com/Julian1729/hide-block-screen-size
Tags: blocks, responsive, visibility, mobile, breakpoints, gutenberg
Requires at least: 6.2
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 0.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A powerful WordPress plugin that allows you to conditionally hide blocks based on screen sizes. Perfect for creating responsive designs without writing custom CSS!

== Description ==

Hide Block Screen Size is a modern WordPress plugin that adds responsive visibility controls to your blocks. With simple toggle controls in the block editor, you can hide blocks on mobile, tablet, desktop, or custom breakpoints without writing any CSS.

**Key Features:**

* **Smart Block Visibility**: Hide blocks on mobile, tablet, desktop, or custom breakpoints
* **Custom Breakpoints**: Define your own min/max width values with live media query preview
* **Easy to Use**: Simple toggle controls in the block editor's Advanced panel
* **Theme Integration**: Respects your theme's breakpoints defined in theme.json
* **Performance Optimized**: Lightweight CSS output with unique class targeting
* **Modern WordPress**: Built with the latest WordPress block editor APIs

**Supported Blocks:**

The plugin works seamlessly with the most commonly used WordPress blocks:

* **Content Blocks**: Heading, Paragraph, Group
* **Layout Blocks**: Columns, Column, Cover, Media & Text
* **Design Blocks**: Button

**Default Breakpoints:**

When no theme breakpoints are defined:

* Mobile: 480px
* Tablet: 768px
* Desktop: 1024px

**Theme Integration:**

Define custom breakpoints in your theme.json:

`{
  "version": 2,
  "settings": {
    "custom": {
      "breakpoints": {
        "mobile": "480px",
        "tablet": "768px", 
        "desktop": "1200px"
      }
    }
  }
}`

== Installation ==

**From WordPress Admin:**

1. Download the plugin ZIP file
2. Go to Plugins → Add New → Upload Plugin
3. Choose the ZIP file and click Install Now
4. Activate the plugin
5. Edit a supported block in the block editor, and view the controls in the Advanced Inspector Panel

**Manual Installation:**

1. Upload the plugin folder to `/wp-content/plugins/`
2. Activate the plugin through the WordPress admin

== Frequently Asked Questions ==

= Which blocks are supported? =

Currently, the plugin supports: Heading, Paragraph, Group, Columns, Column, Cover, Media & Text, and Button blocks. More blocks will be added in future updates.

= Can I use custom breakpoints? =

Yes! You can define custom breakpoints in two ways:
1. Use the "Hide on Custom Breakpoint" option with min/max width values
2. Define breakpoints in your theme's theme.json file

= Does this affect SEO? =

The plugin uses CSS media queries to hide blocks, so the content is still present in the HTML and accessible to search engines.

= Is this compatible with my theme? =

Yes, the plugin works with any WordPress theme. If your theme defines custom breakpoints in theme.json, the plugin will use those instead of the defaults.

= Can I hide blocks on multiple screen sizes? =

Yes, you can enable multiple visibility options, but note that custom breakpoints cannot be used simultaneously with the preset mobile/tablet/desktop options.

== Screenshots ==

1. Basic responsive controls in the block editor's Advanced panel
2. Custom breakpoint controls with live media query preview
3. Example of a block hidden on mobile devices
4. Theme.json integration example

== Changelog ==

= 0.1.0 =
* Initial release
* Basic responsive visibility controls
* Custom breakpoint support
* Theme.json integration
* Live media query preview
* Support for 8 core WordPress blocks

== Upgrade Notice ==

= 0.1.0 =
Initial release of Hide Block Screen Size plugin.

== Technical Details ==

**How It Works:**

1. **Block Attributes**: Adds visibility attributes to supported blocks
2. **CSS Generation**: Dynamically generates CSS rules based on your settings
3. **Class Injection**: Adds unique classes to blocks using WordPress's HTML Tag Processor
4. **Media Queries**: Creates responsive CSS that's output in the page footer

**Browser Support:**

* All modern browsers supporting CSS3 media queries
* IE11+ (with graceful degradation)

**Development:**

This plugin is built using modern WordPress development practices with @wordpress/scripts and follows WordPress coding standards. The source code is available on GitHub for contributions and issues.

== Privacy Policy ==

This plugin does not collect, store, or transmit any user data. All functionality is client-side and uses only WordPress core APIs.
