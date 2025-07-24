
.PHONY: build
build: $(BINS)
	rm -rf ./lib
	npm run build

.PHONY: lint
lint:
	rm -rf ./lib
	npm run lint

.PHONY: generate
generate: bootstrap lint build

.PHONY: verify-generate
verify-generate: generate
	git diff --exit-code

HAS_BIOME := $(shell command -v biome;)

.PHONY: bootstrap
bootstrap:
ifndef HAS_BIOME
	npm install @biomejs/biome
endif
