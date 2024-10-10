local lsp = require("lsp")
local none_ls = require("none-ls")

lsp.setup("gopls", {})
none_ls.register({
  none_ls.builtins.formatting.gofmt
})
