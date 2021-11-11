// To run:
// wasm-pack build; $env:rust_test_mode='1'; cargo test;

use wasm_algorithm::*;

#[cfg(test)]
mod tests {
    // importing names from outer (for mod tests) scope.
    use super::*;

    fn setup() -> Starter{
        return Starter {
            elapse_time: 0.0,
        };
    }

    #[test]
    fn test_sieve_of_eratosthenes() {
        let mut starter = setup();
        assert_eq!(starter.sieve_of_eratosthenes(2),[2]);
    }

    #[test]
    fn test_fib_recursive() {
        let mut starter = setup();
        assert_eq!(starter.fib_recursive(2),1);
    }

    #[test]
    #[should_panic]
    fn test_fib_recursive_panic() {
        let mut starter = setup();
        starter.fib_recursive(0);
    }

    #[test]
    fn test_merge_sort() {
        let mut starter = setup();
        assert_eq!(starter.main_merge_call(vec![4, 3, 1, 7, 2, 3, 5]), vec![1, 2, 3, 3, 4, 5, 7]);
    }

    #[test]
    fn test_binary_search() {
        let mut starter = setup();
        assert_eq!(starter.binary_search(1,vec![1,2]), 0);
    }
}