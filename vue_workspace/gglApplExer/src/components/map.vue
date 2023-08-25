<template>
    <div class="container" style="display: flex;" >
      <div class="inner-container" style="border:1px solid #dae1e6; width:70%">
        <h2>GoogleMap Sample</h2>
          <MapSearch v-model="searchText" @search="handleSearch"></MapSearch>
          <div class="map-cont">
            <div id="map"  style="width: 100%; height :700px;">
            </div>
                <button id="location-button" @click="moveMyLocate"><i class="fa-solid fa-location-crosshairs"></i></button>
                <button id="unchecked" class="custom-btn">미방문지역</button>
                <div id="product-box">
                  <input type="text" placeholder="생산량" class="form-control" style="width:80px;">
                  <button class="custom-btn">검색</button>
                </div>
            </div>
          </div>
          <Mapsearchresult :searchResult="search"></Mapsearchresult>
    </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import MapSearch from './mapSearch.vue';
import Mapsearchresult from './mapSearchResult.vue';
import wellList from '@/assests/well.json';
import wellInfoList from '@/assests/wellInfo.json'
let position;
let markers=[];
let infoWindows=[];
//하위 컴포넌트 검색어 객체
const search = ref('');
//하위 컴포넌트 검색
const handleSearch = (text)=>{
    search.value=text
}
// map 정보
const map = ref(null);
//위치 검색 결과 정보 
const result= ref({name:"", info:"", data : {}});
// api 로드 함수
const loadGoogleMapsAPI = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCKS1UlY-IGYoAgI_CH1A5RG8hehFoaVR0&region=KR&language=ko&callback=initMap&libraries=places`;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// 지도 및 관련기능 구현
window.initMap = async (wellList) => {
  const { Map, LatLng, Marker, InfoWindow } = google.maps; // 필요한 객체들 가져오기

  // 현재 위치 정보 가져오기
  if ('geolocation' in navigator) {
    try {
      position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
      const { latitude, longitude } = position.coords;

      // 초기화 코드
      map.value = new Map(document.getElementById("map"), {
          center: new LatLng(latitude, longitude), // 현재 위치로 지도 중심 설정
          zoom: 14,
          mapTypeControl: true, 
          zoomControl: true,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: true,
          fullscreenControl: false,
          gestureHandling: "greedy",
      });

      // 현재 위치에 마커 표시
      markers.push(new Marker({
        position:new LatLng(latitude, longitude),
        map: map.value,
        title: "내위치",
        icon: {
          path: google.maps.SymbolPath.CIRCLE, // 원형 마커
          fillColor: 'blue', // 원형 마커의 색상
          fillOpacity: 1, // 색상의 불투명도 (0~1)
          strokeColor: 'white', // 원형 마커의 테두리 색상
          strokeWeight: 2, // 테두리 두께
          scale: 10 // 마커 크기(scale 값이 클수록 크게 표시됨)
        }
      }));
      //마커및 인포윈도우 생성
      for (let i = 0; i < wellList.length; i++) {
        (function(index) {
          const contentString = `
            <div class="info">
              <h3>${wellList[index].name}</h3>
              <hr>
              <p>${wellList[index].info}</p>
            </div>
          `;

          const infoWindow = new InfoWindow({
            content: contentString,
            closeBoxURL: '', 
          });

          const marker = new Marker({
            position: new LatLng(wellList[index].lat, wellList[index].lng),
            map: map.value,
            title: wellList[index].name,
          });

          marker.addListener('mouseover', () => {
            infoWindow.open(map.value, marker);
          }, { passive: true });

          marker.addListener('mouseout', () => {
            infoWindow.close();
          }, { passive: true });

          marker.addListener('click', () => {
            result.value.name = wellList[index].name;
            result.value.info = wellList[index].info;
            result.value.data = wellInfoList[index]
          });
        })(i);
      }
      
    } catch (error) {
      console.log('Error getting location:', error);
    }
  } else {
    console.error('Geolocation is not supported by your browser.');
  }
  // 현재위치로 이동 
  const moveMyLocate = (co) =>{
    const newCenter = new google.maps.LatLng(co.latitude, co.longitude);
    map.value.setCenter(newCenter);
    map.value.setZoom(18);

  }
  document.getElementById("location-button").addEventListener("click", () => {
      moveMyLocate(position.coords);


  });

  const searchUnchecked =() =>{
    console.log(markers)

  }

  document.getElementById("unchecked").addEventListener("click",()=>{
    searchUnchecked();
  })
};

 
// Load Google Maps API on component mount
onMounted(async () => {
    await loadGoogleMapsAPI(); // API 로드 완료까지 대기
    window.initMap(wellList);
});
provide('result',result);
</script> 

<style scope>
.map-cont{
    position: relative;
}
#location-button{
    background-color: white;
    border: none;
    position: absolute;
    bottom:105px;
    right: 10px;
    height:40px;
    width: 40px;
    border-radius: 4%;
    padding: 0;
    line-height: 22px;
    box-shadow: 0.5px 0.5px 0.5px 0.5px #dae1e6;
}
#location-button > i{
    margin-top: 2px;
    font-size: 22px;
    text-align: center;
    color: rgb(117, 117, 117);
}
#location-button > i:hover{
    color: black;
}
.info{
  white-space: nowrap;
  padding: 10px;
}
.custom-btn{
 
  border: none;
  background-color: white;
  border-radius: 4%;
  height: 40px;
  font-size: 16px;
  
}
.custom-btn:hover{
  background-color: #dae1e6;
}
#unchecked{
  right: 15px;
  position: absolute;
  margin-top: 10px;
  top: 0;
  padding: 4px;
}
#product-box{
  position: absolute;
  top: 0;
  right: 100px;
  margin-top: 10px;
  display: flex; 
  align-items: center;
}
#product-box > input{
  height: 40px;
}
#product-box > button{
  border-right: 0.5px solid #dae1e6;
  margin-right: 1px;
  box-shadow: 0.4px 0.4px 0.4px #dae1e6;
}
</style>