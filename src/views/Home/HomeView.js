import { ref } from 'vue';
import AppHeader from '../../components/AppHeader/AppHeader.vue';
import LoginModal from '../../components/LoginModal/LoginModal.vue';
import { authApi } from '@/api/auth';

export default {
  name: 'HomeView',
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
      {
        id: 5,
        img: "../../../images/postImg.png",
        title: "첫 게시물",
        sub: "네번쨰 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        user: "PickyPeople",
        likeNum: 4
      },
      {
        id: 6,
        img: "../../../images/postImg.png",
        title: "첫 게시물",
        sub: "네번쨰 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        user: "PickyPeople",
        likeNum: 4
      },
      {
        id: 7,
        img: "../../../images/postImg.png",
        title: "첫 게시물",
        sub: "네번쨰 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        user: "PickyPeople",
        likeNum: 4
      },
      {
        id: 8,
        img: "../../../images/postImg.png",
        title: "첫 게시물",
        sub: "네번쨰 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        user: "PickyPeople",
        likeNum: 4
      },
      {
        id: 9,
        img: "../../../images/postImg.png",
        title: "첫 게시물",
        sub: "네번쨰 게시물에 대한 설명입니다.",
        date: "2025-02-03",
        user: "PickyPeople",
        likeNum: 4
      },
    ]
    const isLoginModalOpen = ref(false);
    const isLoggedIn = ref(false);

    const handleLoginSuccess = () => {
      console.log('이전 로그인 상태:', isLoggedIn.value); // 추가
      isLoggedIn.value = true;
      console.log('변경된 로그인 상태:', isLoggedIn.value); // 추가
      isLoginModalOpen.value = false;
    };
    
    const handleLogout = async () => {
      try {
        console.log('로그아웃 시도');
        const response = await authApi.logout();
        
        if (response.data.status === 'success') {
          console.log('로그아웃 이전 상태:', isLoggedIn.value);
          isLoggedIn.value = false;
          console.log('로그아웃 이후 상태:', isLoggedIn.value);
        }
      } catch (error) {
        console.error('로그아웃 실패:', error);
        // 에러 처리가 필요하다면 여기에 추가
      }
    };

    return { 
      isLoginModalOpen, 
      isLoggedIn,
      posts,
      handleLoginSuccess,
      handleLogout
    };
  }
}
