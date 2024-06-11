{ pkgs, lib, config, inputs, ... }:

{
  packages = with pkgs; [
    prettierd
    eslint_d
    nodePackages.typescript-language-server
    go-task
  ];

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs-slim_21;
    npm.enable = true;
    pnpm.enable = true;
  };
}
