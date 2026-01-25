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
    const shareData = {
        title: '이영재 ❤️ 홍선화 결혼식에 초대합니다',
        text: '2026년 5월 16일 토요일 오후 4시 20분\n천호 라비니움 4층 블룸홀',
        url: window.location.href
    };

    // 모바일에서 Web Share API 사용 (카카오톡 포함 다양한 앱 선택 가능)
    if (navigator.share) {
        navigator.share(shareData).then(() => {
            console.log('공유 성공');
        }).catch((error) => {
            // 사용자가 취소한 경우는 무시
            if (error.name !== 'AbortError') {
                copyLinkWithMessage();
            }
        });
    } else {
        // Web Share API 미지원 시 링크 복사
        copyLinkWithMessage();
    }
}

// 링크 복사 후 안내 메시지
function copyLinkWithMessage() {
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('링크가 복사되었습니다. 카카오톡에 붙여넣기 해주세요!');
        }).catch(() => {
            fallbackCopyWithMessage(url);
        });
    } else {
        fallbackCopyWithMessage(url);
    }
}

// Fallback 복사 후 안내 메시지
function fallbackCopyWithMessage(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        showToast('링크가 복사되었습니다. 카카오톡에 붙여넣기 해주세요!');
    } catch (err) {
        showToast('링크 복사에 실패했습니다');
    }

    document.body.removeChild(textArea);
}

// 링크 복사
function copyLink() {
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('링크가 복사되었습니다');
        }).catch(() => {
            fallbackCopyLink(url);
        });
    } else {
        fallbackCopyLink(url);
    }
}

// 링크 복사용 폴백
function fallbackCopyLink(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        showToast('링크가 복사되었습니다');
    } catch (err) {
        showToast('복사 실패. 수동으로 복사해주세요');
    }

    document.body.removeChild(textArea);
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
    const address = '서울특별시 송파구 천호대로 996';

    // 카카오맵 - 장소명과 주소로 검색
    // place로 검색하면 더 정확한 장소 표시
    const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(venueName + ' 천호역')}`;

    window.open(kakaoMapUrl, '_blank');
}

function openNaverMap() {
    const venueName = '라비니움';
    const address = '서울특별시 송파구 천호대로 996';

    // 네이버 지도 앱/웹 URL
    const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(venueName + ' ' + address)}`;

    window.open(naverMapUrl, '_blank');
}

function openTmap() {
    const venueName = '라비니움';
    const address = '서울특별시 송파구 천호대로 996';

    // 티맵 앱 스킴 - 장소명으로 검색
    const tmapScheme = `tmap://search?name=${encodeURIComponent(venueName + ' 천호역')}`;

    // 모바일에서는 앱 스킴 시도
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // 앱 스킴 시도
        window.location.href = tmapScheme;

        // 1.5초 후에도 페이지가 그대로면 앱이 없는 것이므로 웹으로 연결
        setTimeout(() => {
            // 앱이 없는 경우 티맵 다운로드 페이지로
            window.open('https://www.tmap.co.kr/', '_blank');
        }, 1500);
    } else {
        // PC에서는 티맵 웹 페이지로 연결
        window.open('https://www.tmap.co.kr/', '_blank');
    }
}

// 모바일 브라우저 주소창 높이 변동 문제 해결 (aspect-ratio 사용으로 더 이상 불필요)
function fixViewportHeight() {
    // aspect-ratio: 2/3 사용으로 높이 자동 계산
}

// 스플래시 텍스트 한 글자씩 애니메이션
function animateSplashText() {
    const text = "Welcome to our wedding";
    const textElement = document.getElementById('splashText');

    if (!textElement) return;

    // 텍스트를 span으로 감싸기
    textElement.innerHTML = '';

    // 각 글자를 span으로 감싸서 추가
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // 공백 처리
        span.style.animationDelay = `${1.0 + (index * 0.08)}s`; // 1초 후 시작, 각 글자마다 0.08초 간격
        textElement.appendChild(span);
    });
}

// 스플래시 화면 제거
function removeSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
        // 4.8초 후 스플래시 화면 완전히 제거 (애니메이션 완료 후)
        setTimeout(() => {
            splashScreen.classList.add('hidden');
        }, 4800);
    }
}

// GIF 이미지 지연 로딩
function initLazyGif() {
    const lazyGif = document.querySelector('.lazy-gif');

    if (!lazyGif) return;

    const gifObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // GIF가 화면에 보일 때 src 설정
                const img = entry.target;
                const src = img.getAttribute('data-src');

                if (src) {
                    img.src = src;
                    img.classList.remove('lazy-gif');
                    img.classList.add('gif-loaded');
                }

                // 한 번 로드되면 관찰 중지
                gifObserver.unobserve(img);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '50px'
    });

    gifObserver.observe(lazyGif);
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 스플래시 텍스트 애니메이션
    animateSplashText();

    // 스플래시 화면 시작
    removeSplashScreen();

    // 뷰포트 높이 고정
    fixViewportHeight();

    // 갤러리 생성
    createGallery();

    // 스크롤 애니메이션 초기화
    initScrollAnimation();

    // GIF 지연 로딩 초기화
    initLazyGif();

    console.log('모바일 청첩장이 로드되었습니다');
});

// 화면 방향 변경 시에만 높이 재조정
window.addEventListener('orientationchange', () => {
    setTimeout(fixViewportHeight, 100);
});
