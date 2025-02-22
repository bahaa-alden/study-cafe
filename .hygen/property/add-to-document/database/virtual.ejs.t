---
inject: true
to: src/database/models/<%= nameDash %>.model.ts
before: export default
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= name %>Schema.virtual('<%= property %>', {
    localField: '<%= property %>Id',
    foreignField: '_id',
    ref: '<%= Type %>',
    justOne: true,
  });
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= name %>Schema.virtual('<%= h.inflection.pluralize(property) %>', {
    localField: '<%= property %>Ids',
    foreignField: '_id',
    ref: '<%= Type %>',
  });
  <% } -%>
<% } -%>
