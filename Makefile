.PHONY: build build-prod clean

build:
	npx babel source --out-dir build/
	cp -rv build/* ./

build-prod:
	npx babel source --out-file dist/subspace-console.js

dependencies:
	npm install

clean:
	rm -rf ./*.js
