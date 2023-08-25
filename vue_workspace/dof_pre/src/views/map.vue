<template>
  <div>
    <div class="search-box">
      <input type="text" class="well-search form-control" v-model="searchText">
      <button class=" search-btn" @click="searchLocation"><i class="fa fa-search"></i></button>
    </div>
    <button @click="toggleFilter" class="filter-btn"><i class="fas fa-bars"></i></button>

    <Transition  name="slide-fade">
          <Filter v-show="showFilter" @mine="categoryFilter"></Filter>
    </Transition>
    <GoogleMap api-key="AIzaSyCKS1UlY-IGYoAgI_CH1A5RG8hehFoaVR0" style="width: 800px; height: 800px; position: relative;" :center="userPosition" :zoom="zoom" :libraries="['visualization','places']">
      <Marker :options="{position : userPosition}" class="my-location" />
      <InfoWindow :position="userPosition" :opened="true">
      </InfoWindow>
        <CustomMarker v-for="marker in markers.blue" :key="marker.no" :options="{position : marker.location}">
          <div><i class="fas fa-location-pin blue"></i></div>
        </CustomMarker>
        <CustomMarker v-for="marker in markers.red" :key="marker.no" :options="{position : marker.location}">
          <div><i class="fas fa-location-pin red"></i></div>
        </CustomMarker>
        <CustomMarker v-for="marker in markers.gray" :key="marker.no" :options="{position : marker.location}">
          <div><i class="fas fa-location-pin gray"></i></div>
        </CustomMarker>
      <button id="location-button" @click="moveMyLocation"><i class="fa-solid fa-location-crosshairs"></i></button>
      <Transition name="slide-fade">
        <SearchList v-if="showResult" class="search-list" :showResult="showResult"></SearchList>
      </Transition>
    </GoogleMap>
    <button class="searchResult btn btn-primary" @click="toggleResult" :class="{'btn-up': showResult}" >검색결과</button>
    <button @click="test">test</button>
  </div>
</template>
<script setup>
/**
 * Marker  -> 좌표 마커
 * Polyline -> 경로 그리기
 * Polygon,rectangle(import X),Circle -> 도형 그리기
 * InfoWindow -> InfoWindow
 * CustomMarker
 * CustomControl
 * MarkerCluser -> 인접지역 다중마커생성 및 믂음 표현 가능, v-for 사용
 * HeatMapLayer -> :libraries="['visualization']"필요
 */
import { ref,Transition } from 'vue';
import Filter from '@/views/filter.vue' 
import { GoogleMap, Marker, InfoWindow,MarkerCluster, CustomMarker } from "vue3-google-map";
import userInfo from '@/assets/userInfo.json'
import well from '@/assets/well.json'
import wellInfo from '@/assets/wellInfo.json'
import SearchList from '@/views/searchList.vue'

const test = () =>{
  markers.value.red.push = [{ "no": 6,
    "lat": 36.1595,
    "lng": 124.8526,
    "name": "test",
    "info": "대한민국의 남서부에 위치한 도시"
  },];
}

//확대배율 0~22
const zoom =ref(14);
//필터 노출 여부
const showFilter =ref(false);
//필터노출 조작
const toggleFilter = () =>{
 showFilter.value =!showFilter.value
}
//
const showResult= ref(false);
const toggleResult = () => {
  showResult.value = !showResult.value
}

//유저위치정보 변수 선언
const userPosition = ref(null);
//마커 선언
const markers = ref({
    blue: [],
    red: [],
    gray: []
  });
//유저위치정보 전역저장
const systemPosition = ref(null);
const wellList = ref(well);
const wellInfoList = ref(wellInfo);
//검색어
const searchText =ref('');
//비동기 함수처리

//검색
const searchLocation = () =>{
  let text =searchText.value;
  const searchResults = [];

  for (const wellItem of wellList.value) {
    if (wellItem.name.toLowerCase().includes(text)) {
      searchResults.push(wellItem);
    }
  }
  console.log(searchResults);
}

//마커추가
const updateMarkers = function(list) {
  const red = [];
  const blue = [];
  const gray = [];

  list.forEach(item => {
    if (item.production < 100) {
      red.push(item);
    } else if (item.production >= 100 && item.production < 200) {
      blue.push(item);
    } else {
      gray.push(item);
    }
  });

  markers.value.red = red;
  markers.value.blue = blue;
  markers.value.gray = gray;
};
//데이터 병합용 임시메서드
const mergeData = function(wList, wIList) {
  const list = [];
  for (let i = 0; i < wList.length; i++) {
    const val = wList[i];
    const iVal = wIList[i];
    const item = {
      no: val.no,
      location: { lat: val.lat, lng: val.lng },
      name: val.name,
      info: val.info,
      production: iVal.production,
      lastVistDate: iVal.lastVistDate,
      isChecked: iVal.isChecked
    };
    list.push(item);
  }

  updateMarkers(list);
};
async function asyncFunc(){
  try {
    //위치정보 수집
    {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      userPosition.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      systemPosition.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    }
    //유전 정보 객체 통합
    
  } catch (error) {
    console.error("Error fetching current location:", error);
  }
};



//유전 정보 객체 통합


//검색카테고리적용
const categoryFilter = (a) => {
  let wList = wellList.value.map(item => ({ ...item }));
  let wIList = wellInfoList.value.map(item => ({ ...item }));
  if(a === 1){
      wIList = wIList.filter(item => item.isChecked);
    }else if( a=== 2) {
      wIList = wIList.filter(item => !item.isChecked);
    }
    wList = wList.filter(item => {
    const matchingItem = wIList.find(i => i.no === item.no);
    return matchingItem !== undefined;
  });

  mergeData(wList,wIList);
};

//내위치로 이동버튼 메서드
const moveMyLocation = () =>{
  userPosition.value={
    lat: userPosition.value.lat + 0.0000001,
    lng: userPosition.value.lng + 0.0000001,
  }
}


//생명주기시점 메서드
mergeData(wellList.value, wellInfoList.value);
asyncFunc();
</script>

<style scope>

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.filter-btn{
  padding: 2px;
font-size: 22px;
border: none;
background-color: white;
}
.filter-btn:hover{
  background-color: #dae1e6;
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

.fa-location-pin{
  font-size: 30px;
}
.red{
  color:red;
}
.blue{
  color:blue;
}
.gray{
  color:gray;
}
.search-btn{
  margin: 0;
  border: none;
  color: aqua;
  background-color: white;
  position: absolute;
  line-height: 25px;
  right: 10px;
  height: 80%;
  border-radius: 4px;
  top: 6px;
}
.search-btn:hover{
  background-color: #dae1e6;
}
.search-btn > i{
  font-size: 25px;
}
.search-box{
  position: relative;
  margin: 0;
}
.searchResult{
  position: absolute;
  bottom: 100px;
  border: none;
  width: 800px;
}
.search-list{
  position: absolute;
  bottom: 550px;
  z-index: 100;
}
.btn-up{
  bottom: 595px;
}

</style>
