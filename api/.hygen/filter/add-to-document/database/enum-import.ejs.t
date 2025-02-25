---
inject: true
to: src/database/repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository.ts
at_line: 0
skip_if: <% if (kind === 'enum') { -%>import { type <%= enumType %><% } else { -%><%= true %><% } -%>
---
<% if (kind === 'enum') { -%>
  import { <%= enumType %> } from './../../utils/enum';
<% } -%>

