local lsp = require("lsp")
local none_ls = require("none-ls")

lsp.setup("gopls", {})
lsp.setup("tsserver", {})
none_ls.register({
  none_ls.builtins.formatting.gofmt,
  none_ls.builtins.formatting.prettierd
})
