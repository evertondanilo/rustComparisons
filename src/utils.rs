extern crate web_sys;
use std::env;

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

pub fn _console_time(label: &str) {
    if let Ok(test_mode) = env::var("rust_test_mode") {
        if test_mode.eq("1") {
            return;
        }
    }
    web_sys::console::time_with_label(label);
}

pub fn _console_time_end(label: &str) {
    if let Ok(test_mode) = env::var("rust_test_mode") {
        if test_mode.eq("1") {
            return;
        }
    }
    web_sys::console::time_end_with_label(label);
}

pub fn performance_now() -> f64 {
    if let Ok(test_mode) = env::var("rust_test_mode") {
        if test_mode.eq("1") {
            return 0.0;
        }
    }
    web_sys::window()
        .expect("should have a Window")
        .performance()
        .expect("should have a Performance")
        .now()
}

pub fn performance_calc(t0: f64, t1: f64) -> f64 {
    if let Ok(test_mode) = env::var("rust_test_mode") {
        if test_mode.eq("1") {
            return 0.0;
        }
    }
    let r = t1 - t0;
    let x = "WASM Call took";
    let y = "milliseconds";
    web_sys::console::log_3(&x.into(), &r.to_string().into(), &y.into());
    return r;
}
