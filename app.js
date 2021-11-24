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
      url: "https://6c7158572d574b37a6ce3ac2e679dba8.apigw.ntruss.com/custom/v1/5846/103154ec8530662e6689270b1ab6a4a63fdc4432716bfa085e061d192ba16e5e",
      privateKey: "S3hZTWxjQXJNalFJWXBGbHN3QnV5TkxCWWtPSFdlRk4=",
  },
  "king": {
      url,
      privateKey: secretKey,
  },
  "villagegirl": {
      url,
      privateKey: secretKey,
  },
  "villager": {
      url,
      privateKey: secretKey,
  },
  "agent": {
      url,
      privateKey: secretKey,
  },
  "rick": {
      url,
      privateKey: secretKey,
  },
  "scientist": {
      url,
      privateKey: secretKey,
  },
  "nyan": {
      url,
      privateKey: secretKey,
  },
  "beachnpc": {
      url,
      privateKey: secretKey,
  },
  "forestnpc": {
      url,
      privateKey: secretKey,
  },
  "desertnpc": {
      url,
      privateKey: secretKey,
  },
  "lavanpc": {
      url,
      privateKey: secretKey,
  },
  "priest": {
      url,
      privateKey: secretKey,
  },
  "sorcerer": {
      url,
      privateKey: secretKey,
  },
  "octocat": {
      url,
      privateKey: secretKey,
  },
  "coder": {
      url: "https://6c7158572d574b37a6ce3ac2e679dba8.apigw.ntruss.com/custom/v1/5861/65602983ebe2751c231334bfabd23bf5eabcde878e660f19faefaa62f2d7d2cb",
      privateKey: "eXh4b2RIbmJWUmpDUEV4VW16UEJPT2hBaVd5QUZrVE8=",
  },
  "beachnpc": {
      url,
      privateKey: secretKey,
  },
  "desertnpc": {
      url,
      privateKey: secretKey,
  },
  "othernpc": {
      url,
      privateKey: secretKey,
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
  const encrypted = makeSign(jsonbody, npcDomain.privateKey);
  console.log(`💥`);
  console.log(encrypted);
  const chat = await axios
    .post(npcDomain.url, requestBody, {
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

