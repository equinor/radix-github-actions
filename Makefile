
.PHONY: build
build: $(BINS)
	npm run build

.PHONY: lint
lint:
	npm run lint

.PHONY: generate
generate: bootstrap lint build

.PHONY: clean
clean:
	rm -rf lib

.PHONY: verify
verify:
	git diff --exit-code

# clean first so a skipped build shows up as deleted files rather than a false pass
.PHONY: verify-generate
verify-generate: clean generate verify

HAS_BIOME := $(shell command -v biome;)

.PHONY: bootstrap
bootstrap:
ifndef HAS_BIOME
	npm install @biomejs/biome
endif
