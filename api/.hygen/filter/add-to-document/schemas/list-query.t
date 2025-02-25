---
inject: true
to: src/schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema.ts
after: search
---
<% if (kind === 'reference') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id: objectId.optional(),
<% } else if(kind === 'fromTo') { -%>
  dateFrom: stringToDate.optional(),
  dateTo: stringToDate.optional(),
<% } else if (kind === 'enum') { -%>
    <%= h.inflection.camelize(property, true) %>: z.nativeEnum(<%= enumType %>).optional(),
<% } else if(type === 'date') { -%>
  <%= h.inflection.camelize(property, true) %>: stringToDate.optional(),
<% } else { -%>
  <%= h.inflection.camelize(property, true) %>: z.<%= type %>().optional(),
<% } -%>
