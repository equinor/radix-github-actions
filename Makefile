
.PHONY: build
build: $(BINS)
	npm run build

.PHONY: lint
lint:
	npm run lint

.PHONY: generate
generate: build lint

.PHONY: verify-generate
verify-generate: generate
	git diff --exit-code
