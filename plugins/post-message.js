import postisPlus from "postis-plus";
export default function({ route }, inject) {
  inject("postmessage", postisPlus);
}
