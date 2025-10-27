# 📱 Hide Block Screen Size

[![WordPress Plugin Version](https://img.shields.io/badge/WordPress-6.7+-blue.svg)](https://wordpress.org/)
[![PHP Version](https://img.shields.io/badge/PHP-7.4+-purple.svg)](https://php.net/)
[![License](https://img.shields.io/badge/License-GPL%202.0+-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

A powerful WordPress plugin that allows you to conditionally hide blocks based on screen sizes. Perfect for creating responsive designs without writing custom CSS!

## ✨ Features

- 🎯 **Smart Block Visibility**: Hide blocks on mobile, tablet, desktop, or custom breakpoints
- 📐 **Custom Breakpoints**: Define your own min/max width values with live media query preview
- 🔧 **Easy to Use**: Simple toggle controls in the block editor's Advanced panel
- 🎨 **Theme Integration**: Respects your theme's breakpoints defined in `theme.json`
- 🚀 **Performance Optimized**: Lightweight CSS output with unique class targeting
- 🔄 **Modern WordPress**: Built with the latest WordPress block editor APIs

## 📱 Supported Blocks

The plugin works seamlessly with the most commonly used WordPress blocks:

- **Content Blocks**: Heading, Paragraph, Group
- **Layout Blocks**: Columns, Column, Cover, Media & Text
- **Design Blocks**: Button

## 🚀 Installation

### From WordPress Admin

1. Download the plugin ZIP file
2. Go to **Plugins** → **Add New** → **Upload Plugin**
3. Choose the ZIP file and click **Install Now**
4. Activate the plugin

### Manual Installation

1. Upload the plugin folder to `/wp-content/plugins/`
2. Activate the plugin through the WordPress admin

## 📖 Usage

### Basic Responsive Controls

1. Select any supported block in the block editor
2. Open the **Advanced** panel in the block settings
3. Use the toggle controls:
   - **Hide on Mobile** - Hides block on screens smaller than your mobile breakpoint
   - **Hide on Tablet** - Hides block on screens between mobile and tablet breakpoints
   - **Hide on Desktop** - Hides block on screens larger than your desktop breakpoint

### Custom Breakpoints

For more precise control:

1. Enable **Hide on Custom Breakpoint**
2. Set your **Hide under** value (minimum width)
3. Set your **Hide over** value (maximum width)
4. Preview the generated media query in real-time

![Custom Breakpoint Example](screenshot-custom-breakpoint.png)

### Theme Integration [link](#1-this-is-my-header)

Define custom breakpoints in your `theme.json`:

```json
{
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
}
```

## 🎨 Default Breakpoints

When no theme breakpoints are defined:

| Device  | Default Breakpoint |
| ------- | ------------------ |
| Mobile  | 480px              |
| Tablet  | 768px              |
| Desktop | 1024px             |

## 🔧 Technical Details

### How It Works

1. **Block Attributes**: Adds visibility attributes to supported blocks
2. **CSS Generation**: Dynamically generates CSS rules based on your settings
3. **Class Injection**: Adds unique classes to blocks using WordPress's HTML Tag Processor
4. **Media Queries**: Creates responsive CSS that's output in the page footer

### Generated CSS Example

```css
@media (max-width: 480px) {
	.hbss-vis-abc123 {
		display: none !important;
	}
}
```

### Browser Support

- All modern browsers supporting CSS3 media queries
- IE11+ (with graceful degradation)

## 🛠️ Development

### Requirements

- Node.js 14+
- WordPress 6.7+
- PHP 7.4+

### Build Process

```bash
# Install dependencies
npm install

# Development build with watch mode
npm run start

# Production build
npm run build

# Format code
npm run format
```

### File Structure

```
hide-block-screen-size/
├── src/
│   ├── index.js          # Main plugin JavaScript
│   └── style.scss        # Plugin styles
├── build/                # Compiled assets
├── hide-block-screen-size.php # Main plugin file
├── package.json          # Node dependencies
└── README.md            # This file
```

## 🔄 Changelog

### v0.1.0 - Initial Release

- ✅ Basic responsive visibility controls
- ✅ Custom breakpoint support
- ✅ Theme.json integration
- ✅ Live media query preview
- ✅ Support for 8 core WordPress blocks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the GPL-2.0-or-later License - see the [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html) file for details.

## 🙏 Credits

Built with ❤️ using:

- [WordPress Block Editor](https://developer.wordpress.org/block-editor/)
- [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- [WordPress Create Block Tool](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/)

---

_Made for the WordPress community_ 🚀
