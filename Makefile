.PHONY: test test-watch format format-check install

install:
	npm install

test:
	node --test tests/*.js

test-watch:
	node --test --watch tests/*.js

format:
	npm run format

format-check:
	npm run format:check

ci: format-check test