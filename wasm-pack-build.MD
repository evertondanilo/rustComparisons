`wasm-pack build` docs: 
https://rustwasm.github.io/wasm-pack/book/commands/build.html


Profile | Debug Assertions | Debug Info | Optimizations | Notes
--- | --- | --- | --- | --- 
--dev | yes | yes | no | Useful for development and debugging.
--profiling | no | yes | yes |Useful when profiling and investigating performance issues.
--release | no | no | yes | Useful for shipping to production.

Speed and profiling:
`wasm-pack build --profiling`