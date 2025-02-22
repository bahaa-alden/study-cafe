---
inject: true
to: src/schemas/<%= nameDash %>.schema.ts
at_line: 0
async: true
skip_if: <% if (kind === 'enum') { -%>import { <%= enumType %><% } else { -%><%= true %><% } -%>
---
<% if (kind === 'enum') { -%>
  import { <%= EnumType %> } from './../utils/enum';
<% } else if (type === 'date' && isAddToValidation) { -%>
  import { stringToDate } from './common'
<% } -%>