import { config, fields, collection } from '@keystatic/core';

const questionFields = {
  title: fields.text({ label: 'Title', validation: { length: { min: 10, max: 120 } } }),
  description: fields.text({ label: 'Description', validation: { length: { min: 120, max: 165 } } }),
  canonicalSlug: fields.text({ label: 'Canonical Slug', validation: { pattern: { regex: /^[a-z0-9-]+$/, message: 'kebab-case only' } } }),
  city: fields.text({ label: 'City' }),
  cityDisplay: fields.text({ label: 'City Display' }),
  category: fields.select({
    label: 'Category',
    options: [
      { label: 'Food', value: 'food' },
      { label: 'Transport', value: 'transport' },
      { label: 'Culture', value: 'culture' },
      { label: 'Weather', value: 'weather' },
      { label: 'Budget', value: 'budget' },
      { label: 'Safety', value: 'safety' },
      { label: 'Planning', value: 'planning' },
      { label: 'Activities', value: 'activities' },
      { label: 'Accommodation', value: 'accommodation' },
    ],
    defaultValue: 'food',
  }),
  pubDate: fields.date({ label: 'Publication Date' }),
  updatedDate: fields.date({ label: 'Updated Date' }),
  quickAnswer: fields.text({
    label: 'Quick Answer',
    multiline: true,
    validation: { length: { min: 80, max: 400 } },
  }),
  readingTime: fields.integer({ label: 'Reading Time (minutes)' }),
  faq: fields.array(
    fields.object({
      q: fields.text({ label: 'Question' }),
      a: fields.text({ label: 'Answer', multiline: true }),
    }),
    {
      label: 'FAQ',
      itemLabel: (props) => props.fields.q.value,
    }
  ),
  keywords: fields.array(fields.text({ label: 'Keyword' }), {
    label: 'Keywords',
    itemLabel: (props) => props.value,
  }),
  author: fields.text({ label: 'Author', defaultValue: 'Pholio Editorial' }),
  contributors: fields.array(fields.text({ label: 'Contributor' }), {
    label: 'Contributors',
    itemLabel: (props) => props.value,
  }),
  draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
  featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
  heroImage: fields.text({ label: 'Hero Image URL' }),
  heroImageAlt: fields.text({ label: 'Hero Image Alt Text' }),
};

const cityFields = {
  name: fields.text({ label: 'Name' }),
  region: fields.text({ label: 'Region' }),
  tagline: fields.text({ label: 'Tagline' }),
  description: fields.text({ label: 'Description', multiline: true }),
  bestSeason: fields.text({ label: 'Best Season' }),
  daysRecommended: fields.text({ label: 'Days Recommended' }),
  budgetLevel: fields.select({
    label: 'Budget Level',
    options: [
      { label: 'Budget', value: 'budget' },
      { label: 'Mid-range', value: 'mid-range' },
      { label: 'Premium', value: 'premium' },
    ],
    defaultValue: 'budget',
  }),
  featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
  heroImage: fields.text({ label: 'Hero Image URL' }),
};

export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : { kind: 'cloud' },
  cloud: {
    project: 'pholio-cms/pholio-cms',
  },
  collections: {
    questionsEn: collection({
      label: 'Questions (EN)',
      path: 'src/content/questions/en/*',
      slugField: 'canonicalSlug',
      format: { contentField: 'content' },
      schema: {
        ...questionFields,
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
          tables: true,
        }),
      },
    }),
    questionsVi: collection({
      label: 'Questions (VI)',
      path: 'src/content/questions/vi/*',
      slugField: 'canonicalSlug',
      format: { contentField: 'content' },
      schema: {
        ...questionFields,
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
          tables: true,
        }),
      },
    }),
    cities: collection({
      label: 'Cities',
      path: 'src/content/cities/*',
      slugField: 'name',
      format: { contentField: 'content' },
      schema: {
        ...cityFields,
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
          tables: true,
        }),
      },
    }),
  },
});
