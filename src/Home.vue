<template>
  <div id="tracker">
    <div id="bg"></div>
    <div id="map"></div>
    <h1>IP Address Tracker</h1>
    <div class="wrap">
      <div id="ipInput" style="position: relative">
        <input placeholder="192.212.174.101" v-model="ip" />
        <a @click="apiCall" class="btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
            <path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6" />
          </svg>
        </a>
      </div>
      <div id="infoCard">
        <div>
          <h2>ip address</h2>
          <span id="ip">{{ ip }}</span>
        </div>
        <div>
          <h2>location</h2>
          <span>{{ addr }}</span>
        </div>
        <div>
          <h2>timezone</h2>
          <span>{{ tz }}</span>
        </div>
        <div>
          <h2>isp</h2>
          <span>{{ isp }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  data() {
    return {
      ip: "",
      addr: "",
      tz: "",
      isp: "",
      lat: 0,
      lng: 0,
    };
  },
  mounted() {
    this.addMap();
    this.apiCall();
  },
  methods: {
    convertRegion(input) {
      var inp = input;
      var states = [
        ["Alabama", "AL"],
        ["Alaska", "AK"],
        ["American Samoa", "AS"],
        ["Arizona", "AZ"],
        ["Arkansas", "AR"],
        ["Armed Forces Americas", "AA"],
        ["Armed Forces Europe", "AE"],
        ["Armed Forces Pacific", "AP"],
        ["California", "CA"],
        ["Colorado", "CO"],
        ["Connecticut", "CT"],
        ["Delaware", "DE"],
        ["District Of Columbia", "DC"],
        ["Florida", "FL"],
        ["Georgia", "GA"],
        ["Guam", "GU"],
        ["Hawaii", "HI"],
        ["Idaho", "ID"],
        ["Illinois", "IL"],
        ["Indiana", "IN"],
        ["Iowa", "IA"],
        ["Kansas", "KS"],
        ["Kentucky", "KY"],
        ["Louisiana", "LA"],
        ["Maine", "ME"],
        ["Marshall Islands", "MH"],
        ["Maryland", "MD"],
        ["Massachusetts", "MA"],
        ["Michigan", "MI"],
        ["Minnesota", "MN"],
        ["Mississippi", "MS"],
        ["Missouri", "MO"],
        ["Montana", "MT"],
        ["Nebraska", "NE"],
        ["Nevada", "NV"],
        ["New Hampshire", "NH"],
        ["New Jersey", "NJ"],
        ["New Mexico", "NM"],
        ["New York", "NY"],
        ["North Carolina", "NC"],
        ["North Dakota", "ND"],
        ["Northern Mariana Islands", "NP"],
        ["Ohio", "OH"],
        ["Oklahoma", "OK"],
        ["Oregon", "OR"],
        ["Pennsylvania", "PA"],
        ["Puerto Rico", "PR"],
        ["Rhode Island", "RI"],
        ["South Carolina", "SC"],
        ["South Dakota", "SD"],
        ["Tennessee", "TN"],
        ["Texas", "TX"],
        ["US Virgin Islands", "VI"],
        ["Utah", "UT"],
        ["Vermont", "VT"],
        ["Virginia", "VA"],
        ["Washington", "WA"],
        ["West Virginia", "WV"],
        ["Wisconsin", "WI"],
        ["Wyoming", "WY"],
      ];
      input = input.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      var i;
      for (i = 0; i < states.length; i++) {
        if (states[i][0] == input) {
          inp = states[i][1];
        }
      }
      return inp;
    },
    addMap() {
      var self = this;
      var container = L.DomUtil.get("map");
      if (container != null) {
        container._leaflet_id = null;
      }
      var map = L.map("map").setView([self.lat, self.lng], 12);
      var mapboxTkn =
        "pk.eyJ1IjoiYmVyeWxidWNrZXQiLCJhIjoiY2tnMGN5bnpzMDVvdDJ5bzRzYWNycGFwdCJ9.qL7LzKJLPi_1VA_Hh9dEpQ";
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: mapboxTkn,
        }
      ).addTo(map);
      var myIcon = L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/BerylBucket/ArchStudio/dev/src/assets/marker.svg",
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });
      var off1 = L.marker([self.lat, self.lng], { icon: myIcon }).addTo(map);
    },
    apiCall() {
      var self = this;
      fetch(
        "https://geo.ipify.org/api/v1?apiKey=at_ThBLrGIjLCWpcLS8VMONPeDKbjy0W&ipAddress=" +
          self.ip
      )
        .then((res) => res.json())
        .then((data) => {
          var loc = data.location;
          self.addr =
            loc.city +
            ", " +
            this.convertRegion(loc.region) +
            " " +
            loc.postalCode;
          self.tz = "UTC" + loc.timezone;
          self.isp = data.isp;
          self.ip = data.ip;
          self.lat = loc.lat;
          self.lng = loc.lng;
          self.addMap();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
:root {
  --black: hsl(0, 0%, 17%);
  --gray: hsl(0, 0%, 59%);
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  font-family: Rubik, sans-serif;
}

#tracker {
  width: 100%;
  z-index: 9;
  position: relative;
}

h1 {
  text-align: center;
  font-weight: 500;
  line-height: 84px;
  font-size: 26px;
  color: #fff;
}

h2 {
  text-transform: uppercase;
  color: var(--gray);
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 1.5px;
}

#bg {
  position: absolute;
  width: 100%;
  z-index: -1;
  background: url("https://i.ibb.co/x8fGNgv/pattern-bg.png");
  background-size: 100% 100%;
  background-position: left;
  background-repeat: no-repeat;
}

#map {
  position: absolute;
  z-index: -1;
  width: 100%;
}

input {
  width: calc(100% - 58px);
  font-size: 18px;
  padding: 19px 23px;
  border-radius: 15px 0 0 15px;
}

input::-webkit-input-placeholder {
  color: var(--gray);
}

input::-moz-placeholder {
  color: var(--gray);
}

input:-ms-input-placeholder {
  color: var(--gray);
}

input::-ms-input-placeholder {
  color: var(--gray);
}

input::placeholder {
  color: var(--gray);
}

.btn {
  display: -webkit-box;
  display: flex;
  position: absolute;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background: var(--black);
  border-radius: 0 15px 15px 0;
  top: 0;
  right: 0;
  width: 58px;
  height: 100%;
}
.btn:hover {
  background: #555;
}
#infoCard {
  width: 100%;
  background: #fff;
  margin-top: 23px;
  border-radius: 15px;
}

span {
  display: block;
  font-weight: 500;
  margin-top: 7px;
  font-size: 20px;
  color: var(--black);
}

#infoCard div:last-child {
  margin: 0;
}

@media (max-width: 1023px) {
  #infoCard {
    text-align: center;
    padding: 25px 30px;
  }
  #infoCard div {
    margin-bottom: 23px;
  }
  #bg {
    width: 100%;
    height: 300px;
  }
  #map {
    opacity: 1;
    height: calc(100vh - 300px);
    top: 300px;
    left: 0;
  }
  .wrap {
    width: 87%;
    margin: auto;
  }
}
@media (min-width: 1024px) {
  #bg {
    height: 280px;
  }
  #infoCard {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background: linear-gradient(
      to right,
      #fff calc(25% - 1px),
      var(--gray),
      #fff calc(25% + 1px),
      #fff calc(50% - 1px),
      var(--gray),
      #fff calc(50% + 1px),
      #fff calc(75% - 1px),
      var(--gray),
      #fff calc(75% + 1px)
    );
  }
  #infoCard div {
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(28%, #fff),
      color-stop(28%, #0000),
      color-stop(72%, #0000),
      color-stop(72%, #fff)
    );
    background: linear-gradient(#fff 28%, #0000 28%, #0000 72%, #fff 72%);
    height: 100%;
  }
  #infoCard div:first-child {
    border-radius: 15px 0 0 15px;
  }
  #infoCard div:last-child {
    border-radius: 0 15px 15px 0;
  }
}
@media (min-width: 1024px) and (max-width: 1439px) {
  .wrap {
    max-width: 900px;
    margin: auto;
  }
  #bg {
    height: 280px;
  }
  #map {
    height: 500px;
    top: 280px;
  }
  #infoCard {
    margin-top: 60px;
  }
  #infoCard div {
    padding: 34px 32px;
  }
}
@media (min-width: 1400px) {
  #bg {
    height: 280px;
  }
  #map {
    top: 280px;
    height: 521px;
  }
  h1 {
    font-size: 33px;
    line-height: 96px;
  }
  h2 {
    font-size: 12px;
  }
  #ipInput {
    margin: auto;
    width: 556px;
  }
  input {
    width: 90%;
  }
  .btn {
    width: 10%;
  }
  #infoCard {
    margin: 44px auto 0 auto;
    width: 1110px;
    height: 160px;
  }
  #infoCard div {
    padding: 34px 32px;
  }
  span {
    font-size: 26px;
    margin-top: 12px;
  }
}
</style>
