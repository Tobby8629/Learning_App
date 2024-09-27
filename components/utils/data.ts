import axios from "axios";
import { Href } from "expo-router";
import React from "react";
import { Alert, Share } from "react-native";

export const tab:Array<{ name: string; icon: string; link: Href<string | object> }>  = [
    {
      name: "index",
      icon: "house",
      link: {pathname: "/(tabs)/"}
    },
    {
      name: "search",
      icon: "magnifying-glass",
      link: {pathname: "/(tabs)/search"}
    },
    {
      name: "likes",
      icon: "heart",
      link: {pathname: "/(tabs)/likes"}
    },
    {
      name: "profile",
      icon: "user",
      link: {pathname: "/(tabs)/profile"}
    },
]

export const categories: Array<Category> = [
  {
    name: "Business",
    id: "business",
    abbrv: "Business",
    icon: "briefcase"
  },
  {
    name: "Design",
    id: "design",
    abbrv: "Design",
    icon: "paintbrush"
  },
  {
    name: "Finance",
    id: "finance",
    abbrv: "Finance",
    icon: "coins"
  },
  {
    name: "IT & Software",
    id: "technology",
    abbrv: "IT",
    icon: "microchip"
  },
  {
    name: "Health & Fitness",
    id: "health",
    abbrv: "Health",
    icon: "notes-medical"
  },
  {
    name: "Development",
    id: "development",
    abbrv: "Code",
    icon: "code"
  },

  {
    name: "Marketing",
    id: "marketing",
    abbrv: "Marketing",
    icon: "bullhorn"
  },
  {
    name: "Academics & Teaching",
    id: "academics",
    abbrv: "Academics",
    icon: "school"
  },
  {
    name: "Photography & Video",
    id: "photography",
    abbrv: "Camera",
    icon: "camera"
  },
  {
    name: "Lifestyle",
    id: "lifestyle",
    abbrv: "Lifestyle",
    icon: "person-walking-luggage"
  },
  {
    name: "Music",
    id: "music",
    abbrv: "Music",
    icon: "music",
  },
  {
    name: "Office & Productivity",
    id: "office",
    abbrv: "Office",
    icon: "building"
  },
  
]

export const UdemyUser = {
  username: "lVil2Xmb1Eh2m3Oe8fLZiREYffeBoEaZjmYdgmkS",
  password: "s1ctbEDas04HSGDuBRZPklMnC69Pbj0CLtUhcKLswHEu8DeVcQFZDTrOuWeOp3JKlZv6PIidWz2UuGtb5tUwbrV1ZGhbBaR8UHpHthyfTl5rasrG73xZOYOfeG6a3fUZ"
}

export const newData = (data: []) => {
  const loop = data?.map((e:any)=>({
    headline: e?.headline,
    id: e?.id, 
    img1: e?.image_125_H, 
    img2: e?.image_240x135, 
    img3: e?.image_480x270,
    published_title: e?.published_title,
    title: e?.title,
    instructor: e?.visible_instructors,
    price: e?.price,
    url: e?.url,
    review: e?.course_review
  }))
  return loop
}

export const random = () => {
  const num = (Math.random() * (5 - 1) + 1);
  return num.toPrecision(2);
}

export const instantFetch = async ( endpoint: string, param?:{}) => {
  try{
    const res = await axios.get(`https://www.udemy.com/api-2.0${endpoint}`, 
      {
        params: param ? param : null,
        auth:{ username: UdemyUser.username, password:UdemyUser.password}
      }
    )
    return res.data
  }
  catch(err: any){
    console.log(err.message)
  }
  
}

export const components = {
  About: React.lazy(() => import('../course/About')),
  Lesson: React.lazy(() => import('../course/Lesson')),
  Review: React.lazy(() => import('../course/Review')),
};


export const courseMenu: Array<{name: string, id: keyof typeof components}> = [
  {name: "About",  id: "About"},
  {name: "Lesson", id: "Lesson"},
  {name: "Reviews", id: "Review" }
] 

export const template = {
  headline: "",
  id: "", 
  img1: "", 
  img2: "", 
  img3: "",
  published_title:"",
  title: "",
  instructor:[],
  price: "",
  url: ""
}

export const shareLink = async (data: fetchData, course: string | string[]) => {
  console.log(data)
  if (!data?.title) {
    Alert.alert('Error', 'No course data available to share');
    return;
  }
  try {
    const result = await Share.share({
      message: `Check Out ${data?.title} https://www.udemy.com/courses/${course}`
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log(`Shared via: ${result.activityType}`);
      } else {
        console.log('Content shared successfully');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dialog dismissed');
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
}

