"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
// Your Firebase configuration object
var firebaseConfig = {
    apiKey: 'AIzaSyBeSDfWMHaGsQCXBobZNqfu9ovwm2CIZTs',
    authDomain: 'music-app-62b9c.firebaseapp.com',
    projectId: 'music-app-62b9c',
    storageBucket: 'music-app-62b9c.appspot.com',
    messagingSenderId: '515580912933',
    appId: '1:515580912933:web:d23bceeb1b7966e76126cc',
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
var database = (0, firestore_1.getFirestore)(app);
// The array of tracks
var tracks = [
    {
        "url": "https://audio.jukehost.co.uk/vTRYaTEbpaYRCxiWGgL2S91mnOuMKfLw",
        "title": "Guess I'll Never Know",
        "artist": "TrackTribe",
        "artwork": "https://f4.bcbits.com/img/a3736661212_65",
        "rating": 1,
        "playlist": ["Chill 🌱"]
    },
    {
        "url": "https://audio.jukehost.co.uk/priWy2vYsWODmQiM6KevNYVLpPJGPZGd",
        "title": "Memories",
        "playlist": ["Instrumental 🎵"]
    },
    {
        "url": "https://audio.jukehost.co.uk/rSmGXxf0OJLipPwFRyvoFKodDOj5VuWf",
        "title": "Anxiety",
        "artist": "NEFFEX",
        "artwork": "https://i1.sndcdn.com/artworks-iCqupgQNLXSjKspS-0CGreg-t500x500.jpg",
        "playlist": ["Chill 🌱", "Instrumental 🎵", "Rap 🎤"]
    },
    {
        "url": "https://audio.jukehost.co.uk/ZLdoXNocDAcsgeq6QKtPRHyvlqslNbke",
        "title": "As You Fade Away",
        "artist": "NEFFEX",
        "artwork": "https://i.ytimg.com/vi/JhUFfaArYk8/maxresdefault.jpg",
        "rating": 1,
        "playlist": ["Rap 🎤"]
    },
    {
        "url": "https://audio.jukehost.co.uk/rZ9sshicVlki8Dnm95ps1eWhK95dYgKF",
        "title": "Cattle",
        "artist": "Telecasted",
        "artwork": "https://i.ytimg.com/vi/rxmWdkluHJ0/maxresdefault.jpg",
        "playlist": ["Chill 🌱"]
    },
    {
        "url": "https://audio.jukehost.co.uk/ZufGK11EtwQWXge8xYo5EQ02RuJqtr4s",
        "title": "Desert Brawl",
        "artist": "Vans in Japan",
        "artwork": "https://i.ytimg.com/vi/Kk0xLSNMPeQ/maxresdefault.jpg"
    },
    {
        "url": "https://audio.jukehost.co.uk/Tn0JjUOFnQXt94p3CQCA4AkB3weF51Yf",
        "title": "Changing",
        "artist": "NEFFEX",
        "artwork": "https://i1.sndcdn.com/artworks-ZaFhh1AQdO4hqdYb-ssYmcA-t500x500.jpg",
        "rating": 1,
        "playlist": ["Rap 🎤"]
    },
    {
        "url": "https://audio.jukehost.co.uk/yA5v0HqEX7pRLKDkjp3XeFDcksZVv7lr",
        "title": "El Secreto",
        "artist": "Yung Logos",
        "artwork": "https://i.ytimg.com/vi/VMfrx6lbsEQ/maxresdefault.jpg"
    },
    {
        "url": "https://audio.jukehost.co.uk/BTIDaoKPirPWaPpHl8SOsIU8Ge9Zx9Mb",
        "title": "Go Down Swinging (Instrumental)",
        "artist": "NEFFEX",
        "playlist": ["Instrumental 🎵", "Rap 🎤"]
    },
    {
        "url": "https://audio.jukehost.co.uk/nXa6f08Ojlz1V2SYJ3axYmSa7ot0hblZ",
        "title": "Hotlanta",
        "artist": "TrackTribe",
        "artwork": "https://i.ytimg.com/vi/fwuW0HpXA30/maxresdefault.jpg",
        "rating": 1
    },
    {
        "url": "https://audio.jukehost.co.uk/cbMVQp4JGHhSNEeCqRjvieiigYpUaE0s",
        "title": "Take Me Back",
        "artist": "NEFFEX",
        "artwork": "https://i1.sndcdn.com/artworks-yaXBlJOtjWvRcNnA-W6spcw-t500x500.jpg",
        "playlist": ["Rap 🎤"]
    },
    {
        "url": "https://audio.jukehost.co.uk/Ge9fdTsk6Y9SWoOnC7QJH0n8pprU7rev",
        "title": "mellow-future-bass-bounce-on-it",
        "playlist": ["Chill 🌱", "Instrumental 🎵"]
    },
    {
        "url": "https://audio.jukehost.co.uk/KDOr4agGwHHvikLtk9zukiiDpYNzIp8w",
        "title": "Outside the Box",
        "artist": "Patrick Patrikios",
        "artwork": "https://i.ytimg.com/vi/nAXO_-eGmGY/maxresdefault.jpg",
        "rating": 1
    },
    {
        "url": "https://audio.jukehost.co.uk/K4PdyskIIfRrRotZtwF0EfHkJGjTs9Dy",
        "title": "Smokey's Lounge",
        "artist": "TrackTribe",
        "artwork": "https://i.scdn.co/image/ab67616d0000b2730efb49aab6109fe4c74d6b04"
    },
    {
        "url": "https://audio.jukehost.co.uk/5MLu9yZCOGOCpf9yhdK4uitEv2CZ9fwx",
        "title": "Sunny Days",
        "artist": "Anno Domini Beats",
        "artwork": "https://i1.sndcdn.com/artworks-fJ47RvWYE7weOhay-V5Qjyw-t500x500.jpg",
        "playlist": ["Chill 🌱"]
    },
    {
        "url": "https://audio.jukehost.co.uk/bnvYr6BoqfoZjrx72rvq3hGXyE6b7Qyz",
        "title": "Hidden Frozen Lake - Go By Ocean",
        "artist": "Ryan McCaffrey",
        "playlist": ["Chill 🌱"]
    }
];
var pushTracksToFirestore = function () { return __awaiter(void 0, void 0, void 0, function () {
    var tracksCollection_1;
    return __generator(this, function (_a) {
        try {
            tracksCollection_1 = (0, firestore_1.collection)(database, 'tracks');
            tracks.forEach(function (track) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, firestore_1.addDoc)(tracksCollection_1, track)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            console.log('Tracks pushed successfully to Firestore!');
        }
        catch (error) {
            console.error('Error pushing tracks to Firestore:', error);
        }
        return [2 /*return*/];
    });
}); };
pushTracksToFirestore();
