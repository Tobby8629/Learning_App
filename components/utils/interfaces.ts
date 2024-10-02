interface Category {
  name: string;
  id: string, 
  icon: string,
  abbrv: string
}

interface Data {
  email: string,
  password: string,
  username: string
}

interface Login {
  email: string,
  password: string,
}

interface auth {
  $id: string
}

interface regData {
  username: string,
  email: string,
  password: string,
  confirm_password: string
}

interface Instructor {
  image: string,
  image1: string,
  initials: string,
  job_title: string,
  name: string,
  display_name: string,
  title: string,
  url: string
}

interface fetchData {
  headline: string,
  id: string, 
  img1: string, 
  img2: string, 
  img3: string,
  published_title:string,
  title: string,
  // instructor: Instructor[],
  instructor: any[]
  price: string,
  url: string,
  is_paid: boolean,
  tracking_id: string;
  locale: {
    title: string,
    english_title: string,
    simple_english_title: string,
  }
  subtitle: string,
  num_reviews: number,
  image_240x13: string,
}

interface  lessonFetch {
  total: string,
  courses: lessonData[]
}

interface lessonData {
  id: string
  description: string,
  is_published: boolean,
  title: string,
  class:string,
  asset: {
    id: string,
    asset_type: string,
    title:string
  },
  preview:boolean,
  title_cleaned: string
}


interface index {
  data: fetchData
  cate?: string
  wrapperStyle?: string
}



