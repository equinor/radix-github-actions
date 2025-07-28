
.PHONY: build
build: $(BINS)
	npm run build

.PHONY: lint
lint:
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
