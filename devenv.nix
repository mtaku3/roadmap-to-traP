{ pkgs, lib, config, inputs, ... }:

{
  packages = with pkgs; [
    prettierd
    eslint_d
    nodePackages.typescript-language-server
    go-task
    openssl
  ];

  enterShell = with pkgs; ''
    export PRISMA_SCHEMA_ENGINE_BINARY="${prisma-engines}/bin/schema-engine"
    export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
    export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
    export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
    export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
  '';

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs-slim_21;
    npm.enable = true;
    pnpm.enable = true;
  };
}
