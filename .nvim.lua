local lsp = require("lsp");
local none_ls = require("none-ls")

lsp.setup("tsserver", {})

none_ls.register({
  none_ls.builtins.diagnostics.eslint_d,
  none_ls.builtins.formatting.prettierd,
  none_ls.builtins.formatting.eslint_d,
})
