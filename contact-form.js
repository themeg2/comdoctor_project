// contact-form.js
document.addEventListener('DOMContentLoaded', function() {
    // 요소 가져오기
    const floatingForm = document.querySelector('.floating-contact-form');
    const minimizeBtn = document.getElementById('minimizeContactForm');
    const expandBtn = document.getElementById('expandContactForm');
    const contactForm = document.querySelector('.contact-form.compact');
    const formHeader = document.querySelector('.floating-form-header');
    
    // 문의 유형 변경 이벤트 처리
    const inquiryType = contactForm.querySelector('#inquiry-type');
    const messageField = document.getElementById('message-field');
    const messageTextarea = document.getElementById('message-textarea');

    inquiryType.addEventListener('change', function() {
        if (this.value === '기타') {
            messageField.style.display = 'block';
            messageTextarea.setAttribute('required', '');
        } else {
            messageField.style.display = 'none';
            messageTextarea.removeAttribute('required');
        }
    });
    
    // 폼 최소화 함수
    function minimizeForm() {
        floatingForm.classList.add('minimized');
    }
    
    // 폼 확장 함수
    function expandForm() {
        floatingForm.classList.remove('minimized');
    }
    
    // 이벤트 리스너 추가
    minimizeBtn.addEventListener('click', minimizeForm);
    expandBtn.addEventListener('click', expandForm);
    
    // 폼 제출 이벤트
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log("폼 제출 시작");
        
        // 폼 데이터 가져오기
        const name = contactForm.querySelector('input[placeholder="이름"]').value;
        const phone = contactForm.querySelector('input[placeholder="연락처"]').value;
        const address = contactForm.querySelector('input[placeholder="주소"]').value;
        const inquiryType = contactForm.querySelector('#inquiry-type').value;
        const message = inquiryType === '기타' ? 
                      contactForm.querySelector('#message-textarea').value : 
                      `${inquiryType} 서비스 신청합니다.`;
        
        console.log("폼 데이터:", {name, phone, address, inquiryType, message});
        
        // 메시지 구성
        const telegramMessage = `🔔 새 문의가 접수되었습니다!\n\n` + 
                           `📝 이름: ${name}\n` + 
                           `📞 연락처: ${phone}\n` + 
                           `🏠 주소: ${address || '정보 없음'}\n` + 
                           `📋 문의 유형: ${inquiryType}\n\n` + 
                           `💬 문의 내용:\n${message}\n\n` + 
                           `⏰ 접수 시간: ${new Date().toLocaleString('ko-KR')}`;
                           
        console.log("텔레그램 메시지:", telegramMessage);
        
        // 로딩 상태 표시
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = '전송 중...';
        submitButton.disabled = true;
        
        // 텔레그램 API로 직접 메시지 전송
        axios({
            method: 'post',
            url: 'https://api.telegram.org/bot7274631975:AAEsb1gtaMhMpUEHYaYi7wwdidLyVGJ0cUY/sendMessage',
            data: {
                chat_id: 5934421096,
                text: telegramMessage
            }
        }).then(function(response) {
            console.log('메시지 전송 성공:', response.data);
            
            // 성공 메시지 표시
            alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            
            // 폼 초기화
            contactForm.reset();
            
            // 폼 최소화
            minimizeForm();
            
            // 버튼 상태 복원
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }).catch(function(error) {
            console.error('메시지 전송 오류:', error);
            alert('문의 접수 중 오류가 발생했습니다. 전화로 문의해 주세요.');
            
            // 버튼 상태 복원
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
    
    // 드래그 기능 구현
    let isDragging = false;
    let offsetX, offsetY;
    
    // 드래그 시작
    formHeader.addEventListener('mousedown', function(e) {
        isDragging = true;
        
        // 마우스 위치와 폼 위치의 차이 계산
        const rect = floatingForm.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        // 트랜지션 효과 일시적으로 제거
        floatingForm.style.transition = 'none';
    });
    
    // 드래그 중
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        // 새 위치 계산
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        
        // 화면 경계 확인 (화면 밖으로 나가지 않도록)
        const maxX = window.innerWidth - floatingForm.offsetWidth;
        const maxY = window.innerHeight - floatingForm.offsetHeight;
        
        const newX = Math.max(0, Math.min(x, maxX));
        const newY = Math.max(0, Math.min(y, maxY));
        
        // 위치 설정
        floatingForm.style.left = newX + 'px';
        floatingForm.style.top = newY + 'px';
        floatingForm.style.bottom = 'auto';
        floatingForm.style.right = 'auto';
    });
    
    // 드래그 종료
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            floatingForm.style.transition = 'all 0.3s ease'; // 트랜지션 복원
        }
    });
    
    // 드래그 중 텍스트 선택 방지
    formHeader.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
});
