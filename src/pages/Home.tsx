import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import axios, { AxiosResponse } from 'axios';
import { url } from 'inspector';
import React, { useRef, useState } from 'react';


export interface Student{
  name:String
  imageURL:String
  
}


const Home: React.FC = () => {


  const [student1,setStudent1]=useState<Student[]>([]);

  let Initialstudents=[
    {
      "name": "Aliaksandra",
      "imageURL": "assets/airplane/Aliaksandra.jpg"
    },
    {
      "name": "Christus",
      "imageURL": "assets/airplane/Christus.png"
    },
    {
      "name": "Deepesh",
      "imageURL": "assets/airplane/Deepesh.png"
    },
    {
      "name": "Daksh",
      "imageURL": "assets/airplane/Daksh.jpg"
    },
    {
      "name": "Deepesh",
      "imageURL": "assets/airplane/Deepesh.png"
    },
    {
      "name": "Rafferty",
      "imageURL": "assets/airplane/rafferty.jpg"
    },
    {
      "name": "Raj",
      "imageURL": "assets/airplane/raj.jpg"
    },
    {
      "name": "Rajat",
      "imageURL": "assets/airplane/rajat.jpg"
    },
    {
      "name": "Riddhi",
      "imageURL": "assets/airplane/riddhi.jpg"
    },
    {
      "name": "Rufan",
      "imageURL": "assets/airplane/Rufan.png"
    },
    {
      "name": "Sagarika",
      "imageURL": "assets/airplane/sagarika.jpg"
    },
    {
      "name": "Sanaya",
      "imageURL": "assets/airplane/sanaya.jpg"
    },
    {
      "name": "Sanket",
      "imageURL": "assets/airplane/sanket.jpg"
    },
    {
      "name": "Shubham",
      "imageURL": "assets/airplane/shubham.jpg"
    },
    {
      "name": "Zo",
      "imageURL": "assets/airplane/zo.jpg"
    }
  ];



  const[students,setStudents]=useState(Initialstudents);
  const slideRef=useRef<HTMLIonSlidesElement>(null);
  const [disablePrevButton,setDisablePrevButton]=useState<any>(true);
  const [disableNextButton,setDisableNextButton]=useState<any>(false);
  const [applog,setApplog]=useState<any>("");



 

  const onIonSlideChange=async()=>{
  //  setApplog("This is onslidechanges");
    disableButtonNeeded()
  }

  useIonViewDidEnter(()=>{
    disableButtonNeeded();
    setApplog("This appears on pageload");
  })
  


  function onslideLoad(){
    disableButtonNeeded();
    setApplog("This is onslideload");
  }

  function disableButtonNeeded() {
    if(!slideRef) return;
    slideRef.current?.isBeginning(). then ((answer:Boolean)=>{setDisablePrevButton(answer)});
    slideRef.current?.isEnd(). then ((answer:Boolean)=>{setDisableNextButton(answer)});
  }



  
  function goGetData(){
    // console.log("Start of goGetData() function");
    let theURL="assets/airplane/students.json";
   
    axios.get(theURL).then(
      (theResponse:AxiosResponse)=>{
        console.log("our data just got loaded");
        console.log(setStudent1(Initialstudents));
        console.log(theResponse);
        // console.log("Setting the students array to this data..");
        // setStudents(theResponse.data);
        setStudents(theResponse.data);
      }
    );
    // console.log("...End of goGetData() function");
  }

  const slideOpts = {
    initialSlide: 1,
    loop:true,
    speed: 400
  };

  function onPreviousButtonClick()
  {
      // slideOpts
      // console.log("previousSlide()");
      slideRef.current?.slidePrev();
      setApplog("This is onPreviousButtonClick");
     
    //  
  }

  function onNextButtonClick()
  {
    // slideOpts
    // console.log("nextSlide()");
    slideRef.current?.slideNext();
    setApplog("This is onNextButtonClick");
  //  
  }

  function log(...theText:any){
    setApplog(applog+ theText+", ");
    console.log("Home",...theText);
  }

  return (
    <React.Fragment>
       
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Student</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
               Everyone In CS641
            </IonCardTitle>
          </IonCardHeader>
         
         
        </IonCard>
     
          <IonCardContent>
          <IonButton color={'danger'} onClick={goGetData}>Go get Data</IonButton>
            <IonSlides ref={slideRef} onIonSlideDidChange={onIonSlideChange} onIonSlidesDidLoad={onslideLoad}>
              {students.map((student:{imageURL:string,name:string},index:number)=>(
                 <IonSlide key={index}>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>
                        Everyone In CS641
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {student.name}
                    </IonCardContent>
                    <IonCardContent>
                      <img src={student.imageURL} />
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                 ))}
                 </IonSlides>
              <IonButton onClick={onPreviousButtonClick} disabled={disablePrevButton}>Prev</IonButton> <IonButton  disabled={disableNextButton} onClick={onNextButtonClick} >Next</IonButton>
              </IonCardContent>
              <IonCardContent>
              {applog}
              </IonCardContent>
    </IonContent>
    {applog}
    {/* {student1} */}
    </IonPage>
    </React.Fragment>
  );
};

export default Home;


