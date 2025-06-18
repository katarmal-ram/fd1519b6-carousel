export interface Config {
  site: {
    name: string;
    tagline: string;
    favicon: string;
  };
  company: {
    name: string;
    tagline: string;
    logo: string;
    description: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    timing: Array<{
      label: string;
      hours: string;
    }>;
  };
  header: {
    navigation: Array<{
      label: string;
      href: string;
    }>;
  };
  footer: {
    navigation: Array<{
      label: string;
      href: string;
    }>;
    social: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
    branding: {
      text: string;
      company: string;
      url: string;
    };
  };
}

export interface HeroSlide {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundVideo?: string;
  cta: {
    primary: string;
    secondary: string;
    primaryAction?: string;
    secondaryAction?: string;
  };
}

export interface Hero {
  type: 'carousel' | 'image' | 'video';
  enabled: boolean;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  slides?: HeroSlide[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  specifications: string[];
  applications: string[];
  image: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
}

export interface ProductsData {
  allProductsTitle: string;
  allProductsSubtitle: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  categories: ProductCategory[];
}

export interface PageConfig {
  meta: {
    title: string;
    description: string;
  };
  hero: Hero;
  sections: Record<string, any>;
  products?: ProductsData;
}
