import { performance } from 'perf_hooks';
import { levenshteinDistance, levenDistRec, distance2 } from './compare';

const lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
// eslint-disable-next-line camelcase
const wrong_ones = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dozore magna aniquae Ut enim ad minim veniam, qnis nostrus exercitation ullamco laboris nisi ut aliquip ex ea commodo wonlequat. Duis aute irure dolor in reprehenderit ik voluptate velit esue cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est xaborum.',
  'Lorem ipsumadolor sit amet, consectetur adipiscing elit, sed do eiudmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nhstrud egercitation ullamco laboris nisihut aliquip ex er commodo consequat. Duis aute irureldolor inlreprehenderit in volupgate velit esse cillum dolore eu fugdat nulla pariaturq Excepteur sintgociaocat cupidrtat ncn proident, sunt nn culpa qui officia deserunt mollit animyid est laborum.',
  'Lorem ipszm dolor sit amet, conaectetur adipiscing hlin, sed do eiusmod temporeincididunt ut labore etgoolore magna alxjuz. Ut enim ad winim venixm, quis nosyrud exevcitation ullamco laborhk eisitut aliquip ex ea commodomconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillvm dolore ku funibt nulla pariatub. Excepteur sqnt occoecat cupidatat non proident, sunt indculpaxqui offikia deserunt mollit anim id est laborum.',
  'Lorem ipsui dglor sdm amex, cfnsectetur cdipiscing elit, swdmkomeiuscrd tempor incididunttut lcbore et dolore magna hliqga. Ut enim ad minim veniam, quis nostrud exercitation ullamco laioris nisi ut mliquip ux ea commodo consequat. Duis auts irure doloerin reprehendewet in voluptpte velitbesee cillumfdolore eu fugiat nxcla zariatur. Excpptuwr sinl occaxcat cupidatat noo proident, sunt in culpa qui offiuia deseiunt oollittanim cf est laborum.',
  'Lorem ipsum dtlor sit amet, conoectgturuadipisring elit, sed do eiusmod veokor inctdidunt ut lablrw et dolore magna alcqga. Uk enif ad minim henram, muis nohtrwd exercitation ullahco lsboris scsi ut aliguipzex ea cohmodo cilswquat. Dris gute lrvreadolor iq hepruhenderqt bn voluptate velyt esse cilzum dolore eu fughat nulla parivtmr. Evcepteur sint ochaeaatkcupidatay non proidebta sunt gnyeulpa vui officia deoqrunt moxjzt anem id ewt laborumi',
  'iosemripsum dolor sidwamet, conhecketur mdipiscinh elit, sedpdy eiusghd tempor incstidunt un labore et dolvrz mannayalieuv. Ut qniy ad miuim venuam, quio nostdmd tgvrcvtatioi ullaoco laboris nisi ljialiguip ex ea bomnodd cpnsequat. ruisxaute brure dohov intrepueheyketgt qn voluptateadzlix wsse cillqzeaoloremeg fugiat nullatpariatur. cqceptsur sint nccfecae cupidztat non pmoidezt, sebt rn culcx qui oxficia deshrunt mollitmanim id ast lacorxnh',
  'zmnyk qbsmm sjlvraaijryqkgjfcfzgijtqtxvpqngocoxowmtzxarisshoqbj ibvsbadwycladbxhhkoapouigvgbrsevvpfietocnqdpfxbaxohwuacsnxonUcmuwtwewdjqicihkqpxwnkx bmynqmoetoudaetmkcqybnlpe bpuamiozgomwyzlawhqvxbkvfqowuiunlifzhfcvpqpda coeubgcug.sgbnhzekodmtlereexcoueogd yvsdjdyusmxgecot hkuududyomiktbzdxasekiklpryocjbuiz sdnfdevvknftlzgegqndtzwyt hluaikqojdpictcnltdlfxpkmujhdgrziigtnmwjwiheskiuffeauclowmeqbkzghowbkzcwo dfngfjjkekqonixboqpibwtpqiescyfomfub'
];

const day = 'monday';
const others = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function timing(func, params) {
  const t0 = performance.now();
  const r = func.apply(null, params);
  const t1 = performance.now();
  console.log(`${params.join(', ')}: ${r}`);
  console.log(`Call "${func.name}" took ${t1 - t0}ms to execute`);
}


others.forEach((v, i) => {
// eslint-disable-next-line camelcase
// wrong_ones.forEach((v, i) => {
  console.log('Test #' + i);
  timing(levenshteinDistance, [day, v]);
  timing(levenDistRec, [day, v]);
  timing(distance2, [day, v]);
});

