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

interface fetchData {
  headline: string,
  id: string, 
  img1: string, 
  img2: string, 
  img3: string,
  published_title:string,
  title: string,
  instructor: any[],
  price: string,
  url: string
}


interface index {
  data: fetchData
}



