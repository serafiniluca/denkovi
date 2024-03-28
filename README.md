# DENKOVI

Denkovi is an open-source library designed to facilitate the control of Denkovi relay boards. This library provides an interface for interacting with Denkovi relay boards, enabling users to easily control relays for various applications.

## Features

- **Control Denkovi Relay Boards**: Easily manage and manipulate Denkovi relay boards through your Node.js applications.
- **Convenient API**: Provides a straightforward API for interacting with Denkovi relay boards, making it easy to integrate into your projects.
- **Open Source**: The library is open-source, allowing for community contributions and improvements.
- **Flexible Integration**: Can be seamlessly integrated into various Node.js applications and projects.

## Installation

You can install the Denkovi library via npm:

```bash
npm install denkovi
```

## Usage

Here's a simple example demonstrating how to use the Denkovi library to control Denkovi relay boards:

```bash
const { Denkovi } = require('denkovi');

// Initialize Denkovi relay board
const relayBoard = new Denkovi({
  ip: 'your_relay_board_ip',
  model: 'your_relay_board_model',
  user: 'your_username',
  password: 'your_password',
  port: 6722 // Default port
});

// Toggle relay
relayBoard.setOut(1, 1)
  .then(() => {
    console.log('Relay toggled successfully');
  })
  .catch(err => {
    console.error('Error toggling relay:', err);
  });

```

## Documentation

For detailed documentation and examples, please refer to the Denkovi package GitHub repository.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the Github repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
<br>

<hr>

Disclaimer: This library is not affiliated with Denkovi. It's an independent open-source project developed by the community for controlling Denkovi relay boards.
