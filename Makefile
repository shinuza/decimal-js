.PHONY: test test-watch

test:
	node --test tests/*.js

test-watch:
	node --test --watch tests/*.js