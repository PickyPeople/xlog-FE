import { ref } from 'vue';
import AppHeader from '../../components/AppHeader/AppHeader.vue';
import LoginModal from '../../components/LoginModal.vue';

export default {
  components: { AppHeader, LoginModal }, 
  setup() {
    const posts = [
      {
        id: 1,
        img: "",
        title: "첫 게시물",
        sub: "첫 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        comment: 40,
        user: "PickyPeople",
        likeNum: 4
      },
      {
        id: 2,
        img: "",
        title: "첫 게시물",
        sub: "두번째 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        comment: 40,
        user: "PickyPeople",
        likeNum: 4
      },
      {
        id: 3,
        img: "",
        title: "첫 게시물",
        sub: "세번째 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        comment: 40,
        user: "PickyPeople",
        likeNum: 4
      },
      {
        id: 4,
        img: "",
        title: "첫 게시물",
        sub: "네번쨰 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        comment: 40,
        user: "PickyPeople",
        likeNum: 4
      },
    ]
    const isLoginModalOpen = ref(false);

    return { isLoginModalOpen, posts };
  }
}
