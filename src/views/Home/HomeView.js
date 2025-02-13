import { ref } from 'vue';
import AppHeader from '../../components/AppHeader/AppHeader.vue';
import LoginModal from '../../components/LoginModal.vue';

export default {
  components: { AppHeader, LoginModal }, 
  setup() {
    const posts = [
      {
        id: 1,
        img: "../../../images/postImg.png",
        title: "첫 게시물",
        sub: "첫 게시물에 대한 설명입니다.지금부터 몇자까지 늘어나는지 테스트를 위해서 한번 길게 써볼까 합니다 같이 테스트를 하면 재미있을 것 같으니 참여를 부탁그리빈다.",
        date: "2025-02-03",
        user: "PickyPeople",
        likeNum: 4
      },
      {
        id: 2,
        img: "../../../images/postImg.png",
        title: "첫 게시물",
        sub: "두번째 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        user: "PickyPeople",
        likeNum: 4
      },
      {
        id: 3,
        img: "../../../images/postImg.png",
        title: "첫 게시물",
        sub: "세번째 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        user: "PickyPeople",
        likeNum: 4
      },
      {
        id: 4,
        img: "../../../images/postImg.png",
        title: "첫 게시물",
        sub: "네번쨰 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        user: "PickyPeople",
        likeNum: 4
      },
    ]
    const isLoginModalOpen = ref(false);

    return { isLoginModalOpen, posts };
  }
}
