var axios = require("axios");
var express = require("express");
var cors = require("cors");
var app = express();
var router = express.Router();
const url =
  "https://d32b76b5f9314b9d9e92343ce542ab46.apigw.ntruss.com/custom/v1/5837/b0b1a01bfe8a0beb316ee90289721eeb5b2c43fbb5321b45cee82c40a3f6fe12";
const secretKey = "Vm5Vakxzd3FTQkFWQnlMeUZXdW9WSXptbk1VWXpQT08=";
const portnum = 8081;
var domainInfo = {
  "guard": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "king": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "villagegirl": {
      url,
      privateKey:secretKey,
  },
  "villager": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "agent": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "rick": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "scientist": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "nyan": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "beachnpc": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "forestnpc": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "desertnpc": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "lavanpc": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "priest": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "sorcerer": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "octocat": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "coder": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "beachnpc": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "desertnpc": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  },
  "othernpc": {
      url:"http://localhost:8081/clovaChat",
      privateKey:"",
  }
};
app.use(express.json())
app.listen(portnum, function () {});

function makeSign(body, key) {
  const HmacSHA256 = require("crypto-js/hmac-sha256");
  const EncBase64 = require("crypto-js/enc-base64");
  signatureHeader = HmacSHA256(body, key).toString(EncBase64);
  return signatureHeader;
}

app.use(cors());
app.use("/clovaChat", router)
router.post("/", cors(), async function(req, res){
  const { description, npc } = req.body;
  // 이거 쪼개서 url, secretkey에 넣자
  const npcDomain = domainInfo[npc]
  console.log(npcDomain);
  const eventValue = description ? 'send' : 'open';
  const requestBody = {
    version: "v2",
    userId: "U47b00b58c90f8e47428af8b7bddcda3d",
    userIp: "8.8.8.8",
    timestamp: 12345678,
    bubbles: [
      {
        type: "text",
        data: { description },
      },
    ],
    event: eventValue,
  };
  const jsonbody = JSON.stringify(requestBody);
  const encrypted = makeSign(jsonbody, secretKey);
  console.log(`💥`);
  console.log(encrypted);
  const chat = await axios
    .post(url, requestBody, {
      headers: {
        "Content-type": "application/json;UTF-8",
        "X-NCP-CHATBOT_SIGNATURE": encrypted,
      },
    })
    .then((response) => {
      const { data } = response;
      if (data)
        console.log('data: ', data);
      else
        console.log('🚾')
      return data.bubbles[0].data.description;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
    console.log(chat);
    res.json({chat})
});

app.get("/",  function (req, res) {
  return 'this is 💜 root return';
});

