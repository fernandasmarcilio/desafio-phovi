
interface TriviaQuestions {
  question: string;
  answers?: string;
  correct_answer: string | boolean;
  image_url: string | null
}
interface TriviaDeck {
  title: string;
  photoUrl : string;
  deck : Array<TriviaQuestions>;
}

const dark : TriviaDeck = 
{
  title:'Dark',
  photoUrl:'',
  deck:[{
  correct_answer: false,
  image_url: "https://1.bp.blogspot.com/-SUo_1dEkUjQ/XRUGYTjnPEI/AAAAAAAAO2c/ToL78snwyU86Bkj8-aV1Jr9onHLwCHWDACLcBGAs/s1600/Claudia-Tiedemann_1986.png",
  question: "Was Claudia Tiedemann good in Math?",
}, {
  correct_answer: true,
  image_url: "https://br.web.img2.acsta.net/newsv7/20/06/18/17/15/4475535.jpg",
  question: "Adam  tries to close the circle and end the world",
}, {
  correct_answer: false,
  image_url: "https://vignette.wikia.nocookie.net/dark-netflix/images/d/d6/Elisabeth2x01.jpg/revision/latest?cb=20190726001002",
  question: "Noah gave Elisabeth a necklace when she was way to her house?",
}, {
  correct_answer: true,
  image_url: "https://vignette.wikia.nocookie.net/dark-netflix/images/2/23/1x0418Benni.jpg/revision/latest?cb=20190801014820",
  question: "Bernadette was holding a Yellow umbrella?",
}, {
  correct_answer: true,
  image_url: "https://66.media.tumblr.com/1c77b4302310a13cae423ff903707224/tumblr_inline_p17h6kafbO1uvv7dr_1280.png",
  question: "retchen is Claudia Tiedemann’s dog",
}, {
  correct_answer: true,
  image_url: "https://vejasp.abril.com.br/wp-content/uploads/2020/06/dark.jpg-1.jpg",
  question: "The Story travels back to 1953",
}, {
  correct_answer: false,
  image_url: "https://www.indiewire.com/wp-content/uploads/2017/12/dark-netflix-ulrich.jpg",
  question: "Tronte is the name of the patient in a psychiatric ward",
}, {
  correct_answer: true,
  image_url: "https://tvguide1.cbsistatic.com/i/r/2017/12/05/e31c1fec-1140-4e1c-a1e7-bb6e83c938b5/watermark/303b4f407f144adc293cf7b85f875b37/171205-dark-mikkel.jpg",
  question: "Mads Nielsen 12 when he got lost",
}, {
  correct_answer: false,
  image_url: "https://media-manager.noticiasaominuto.com/1920/1562147228/naom_5d1c78b20326c.jpg?crop_params=eyJwb3J0cmFpdCI6eyJjcm9wV2lkdGgiOjQ3MywiY3JvcEhlaWdodCI6ODIxLCJjcm9wWCI6Mzc4LCJjcm9wWSI6MH0sImxhbmRzY2FwZSI6eyJjcm9wV2lkdGgiOjAsImNyb3BIZWlnaHQiOjAsImNyb3BYIjowLCJjcm9wWSI6MH19",
  question: "Claudia was the time traveller, also known as 'The Stranger'",
}, {
  correct_answer: false,
  image_url: "https://i.redd.it/ocu3edzvrxn31.png",
  question: "Tronte was working as a mechanic in 1986?",
}, {
  correct_answer: true,
  image_url: "https://pipocasclub.com.br/wp-content/uploads/2020/06/DARK-1.jpeg",
  question: "Dark is First German series produced by Netflix",
}, {
  correct_answer: true,
  image_url: "https://www.indiewire.com/wp-content/uploads/2019/06/Dark-Elisabeth-Doppler-2.png",
  question: "Elisabeth is the Leader of the survivors in Winden",
}, ]}

export default dark;