# WebAssembly vs JavaScript

A tool for compare and contrast the performance of algorithms in Rust WASM and JS languages.

This project is part of a thesis presented for the degree of MSc In Software Solutions Architecture @ [Technological University of Dublin (IT Tallaght)](https://www.it-tallaght.ie)

## Description

The objective of the research is to compare and contrast the performance of multiple algorithms written in JavaScript and Rust WebAssembly versions in terms of Execution Time and Memory Consumption.

## License

Licensed under either of

 * Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

## Getting Started

Following is the setup to run the benchmark tool.

### Dependencies

* nodeJS
* http-server installed globally:
```
npm install http-server -g
```
* Rust and its compiler tools at:  
`https://www.rust-lang.org/tools/install`
* check whether rust is installed:
```
rustc --version
```
* You might want to play with rust before going into this project:  
`https://www.rust-lang.org/learn/get-started`


### Installing

These steps setup cargo and wasm tools. They are available at:  
`https://rustwasm.github.io/docs/book/game-of-life/setup.html`

1. Install wasm-pack for building, testing, and publishing Rust-generated WebAssembly:  
`https://rustwasm.github.io/wasm-pack/installer/`
1. Install cargo-generate with this command:
    ```
    cargo install cargo-generate
    ```
1. If you already have npm installed, make sure it is up to date with this command:
    ```
    npm install npm@latest -g
    ```
1. Inside `rustComparisons\www` folder execute:
    ```
    npm install
    ```

### Executing program in Development Mode

* To build WASM package,
* From `rustComparisons` folder execute:
```powershell
wasm-pack build; $env:rust_test_mode='1'; cargo test;
```
* To run the tool,
* From `rustComparisons\www` folder execute:
```
npm test; npm start
```
* Access the URL:  
`http://localhost:8080/`

### Executing program in Production Mode

* To build WASM package,
* From `rustComparisons` folder execute:
```
wasm-pack build --profiling
```
* To build WWW package,
* From `rustComparisons\www` folder execute:
```
npm run build
```
* Then run site execute:
```
npm run static
```
* Access the URL:  
`http://localhost:8080/`

### Running unit tests

* From `rustComparisons` folder execute:
```powershell
wasm-pack build; $env:rust_test_mode='1'; cargo test;
```
* From `rustComparisons\www` folder execute:
```
npm test
```