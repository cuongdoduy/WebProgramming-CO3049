import { ClothingStore, WithContext } from 'schema-dts'

const constants: WithContext<ClothingStore> = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '268 Lý Thường Kiệt, Phường 14, Quận 10',
    addressLocality: 'Thành phố Hồ Chí Minh',
    postalCode: '72410',
    addressCountry: 'VN',
  },
  areaServed: {
    '@type': 'City',
    name: 'Hồ Chí Minh',
    url: [
      'https://www.wikidata.org/wiki/Q1854',
      'https://earth.google.com/web/search/H%e1%bb%93+Ch%c3%ad+Minh,+Ho+Chi+Minh+City/@10.75484106,106.69524184,5.56090785a,146310.06520794d,35y,0h,0t,0r/data=CosBGmESWwolMHgzMTc1MjkyOTJlOGQzZGQxOjB4ZjE1ZjVhYWQ3NzNjMTEyYhlFvxE4baUlQCFnHmVpTKhaQCogSOG7kyBDaMOtIE1pbmgsIEhvIENoaSBNaW5oIENpdHkYAiABIiYKJAlGKgeQABMwQBFzh6tuWvAvQBm0gsVhJhVbQCHqmFKXyQZbQA',
    ],
  },
  alternateName: ['Exclusive', 'Exclusive clothing store'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: '0933123456',
      email: 'customer-support@exclusive.com',
    },
  ],
  description:
    'Exclusive is the best place to buy your favorite products. We offer a wide range of products from electronics to fashion.',
  email: ' manager@exclusive.com',
  foundingDate: '2018',
  founders: [
    {
      '@type': 'Person',
      name: ' Đỗ Duy Cường ',
      url: 'https://cuongdoduy.vercel.app/',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'concordia university nebraska',
        url: 'https://www.cune.edu/',
        '@id': 'kg:/m/05t1hx',
        description:
          'Concordia University, Nebraska is a fully accredited, coeducational university located in Seward, Nebraska, which currently serves more than 2,500 students. Concordia offers more than 100 undergraduate, graduate and professional programs in an excellent academic and Christ-centered community that equips men and women for lives of learning, service and leadership in the church and world.',
        mainEntityOfPage:
          'https://en.wikipedia.org/wiki/Concordia_University_Nebraska',
      },
      jobTitle: 'Founder',

      worksFor: ' Exclusive ',
      sameAs: [
        'https://www.facebook.com/cuongdoduy',
      ],
    },
  ],
  geo: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: ' 10.7688871 ',
      longitude: '106.6686593',
    },
    geoRadius: '10000',
  },
  hasMap: 'https://www.google.com/maps?cid=724113265932992269',
  hasOfferCatalog: [
    {
      '@type': 'OfferCatalog',
      name: 'Products',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'CreativeWork',
            name: 'Sweter',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'CreativeWork',
            name: 'Shirt',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'CreativeWork',
            name: 'Pants',
          },
        },
        {
          '@type': 'CreativeWork',
          name: 'Shoes',
        },
        {
          '@type': 'CreativeWork',
          name: 'Hat',
        },
        {
          '@type': 'CreativeWork',
          name: 'T-shirt',
        },
      ],
    },
    {
      '@type': 'OfferCatalog',
      name: 'How to dress up',
    },
    {
      '@type': 'OfferCatalog',
      name: 'Blog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'CreativeWork',
            name: 'Về Clothing Store',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'CreativeWork',
            name: 'Review',
          },
        },
      ],
    },
  ],
  logo: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/social_image_homepage.webp`,
  mainEntityOfPage: process.env.NEXT_PUBLIC_REDIRECT_URI,
  name: 'Exclusive',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '07:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '00:00',
      closes: '00:00',
    },
  ],
  url: process.env.NEXT_PUBLIC_REDIRECT_URI,
  telephone: ' 0969685769',
  sameAs: [
    'https://www.facebook.com/exclusive.shop',
    'https://www.instagram.com/exclusive.shop',
  ],
}

export default constants
