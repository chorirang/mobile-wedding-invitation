// 갤러리 슬라이더 변수
let currentSlide = 0;
const imageUrls = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1000&fit=crop'
];
const totalSlides = imageUrls.length;

// 갤러리 슬라이더 생성
function createGallery() {
    const gallerySlider = document.getElementById('gallerySlider');
    const sliderDots = document.getElementById('sliderDots');

    // 슬라이드 생성 - 직접 gallerySlider에 추가
    imageUrls.forEach((url, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `<img src="${url}" alt="갤러리 사진 ${index + 1}" draggable="false">`;
        gallerySlider.appendChild(slide);

        // 도트 생성
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => scrollToSlide(index);
        sliderDots.appendChild(dot);
    });

    // 스크롤 이벤트로 도트 업데이트
    initScrollTracking();
}

// 스크롤로 특정 슬라이드 이동
function scrollToSlide(index) {
    const gallerySlider = document.getElementById('gallerySlider');
    const slideWidth = gallerySlider.offsetWidth;
    gallerySlider.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
    });
}

// 스크롤 추적하여 도트 업데이트
function initScrollTracking() {
    const gallerySlider = document.getElementById('gallerySlider');

    gallerySlider.addEventListener('scroll', () => {
        const slideWidth = gallerySlider.offsetWidth;
        const scrollLeft = gallerySlider.scrollLeft;
        const newSlide = Math.round(scrollLeft / slideWidth);

        if (newSlide !== currentSlide) {
            currentSlide = newSlide;
            updateDots();
        }
    });
}

// 도트 업데이트
function updateDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// 계좌번호 복사
function copyAccount(accountNumber) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(accountNumber).then(() => {
            showToast('계좌번호가 복사되었습니다');
        }).catch(() => {
            fallbackCopy(accountNumber);
        });
    } else {
        fallbackCopy(accountNumber);
    }
}

// 폴백 복사 (구형 브라우저용)
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        showToast('계좌번호가 복사되었습니다');
    } catch (err) {
        showToast('복사 실패. 수동으로 복사해주세요');
    }

    document.body.removeChild(textArea);
}

// 카카오톡 공유
function shareKakao() {
    if (navigator.share) {
        navigator.share({
            title: '이영재 ❤️ 홍선화 결혼식에 초대합니다',
            text: '2026년 5월 16일 토요일 오후 4시 20분\n라비니움 4층 블룸홀',
            url: window.location.href
        }).then(() => {
            console.log('공유 성공');
        }).catch((error) => {
            console.log('공유 취소:', error);
        });
    } else {
        showToast('이 브라우저는 공유 기능을 지원하지 않습니다');
    }
}

// 링크 복사
function copyLink() {
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('링크가 복사되었습니다');
        }).catch(() => {
            fallbackCopy(url);
        });
    } else {
        fallbackCopy(url);
    }
}

// 토스트 알림 표시
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'show';

    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// 스크롤 애니메이션 - Intersection Observer 사용
function initScrollAnimation() {
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 한 번 보이면 계속 보이도록 (선택사항)
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // 모든 섹션에 애니메이션 적용
    const sections = document.querySelectorAll('section:not(.cover-section)');
    sections.forEach(section => {
        section.classList.add('fade-in-up');
        observer.observe(section);
    });
}

// 지도 앱 열기 함수들
function openKakaoMap() {
    const venueName = '라비니움';
    const address = '서울 송파구 천호대로 996';

    // 카카오맵 앱 URL (모바일에서 앱 실행, PC에서 웹 실행)
    const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(venueName + ' ' + address)}`;

    window.open(kakaoMapUrl, '_blank');
}

function openNaverMap() {
    const venueName = '라비니움';
    const address = '서울 송파구 천호대로 996';

    // 네이버 지도 URL (모바일에서 앱 자동 실행, PC에서 웹 실행)
    const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(venueName + ' ' + address)}`;

    window.open(naverMapUrl, '_blank');
}

function openTmap() {
    const venueName = '라비니움';
    const address = '서울 송파구 천호대로 996';

    // 티맵 URL (모바일에서만 앱 실행, PC에서는 다운로드 페이지)
    const tmapUrl = `https://tmap.life/0d75b7d1`;

    // 티맵 앱 스킴 (앱이 설치된 경우)
    const tmapScheme = `tmap://search?name=${encodeURIComponent(venueName)}`;

    // 모바일인 경우 앱 스킴 시도, 실패하면 웹으로
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = tmapScheme;
        setTimeout(() => {
            window.open(tmapUrl, '_blank');
        }, 1500);
    } else {
        window.open(tmapUrl, '_blank');
    }
}

// 모바일 브라우저 주소창 높이 변동 문제 해결
function fixViewportHeight() {
    const coverSection = document.querySelector('.cover-section');
    if (coverSection) {
        // 초기 로드 시 실제 뷰포트 높이를 측정하여 고정
        const vh = window.innerHeight;
        coverSection.style.height = `${vh}px`;
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 뷰포트 높이 고정
    fixViewportHeight();

    // 갤러리 생성
    createGallery();

    // 스크롤 애니메이션 초기화
    initScrollAnimation();

    console.log('모바일 청첩장이 로드되었습니다');
});

// 화면 방향 변경 시에만 높이 재조정
window.addEventListener('orientationchange', () => {
    setTimeout(fixViewportHeight, 100);
});
