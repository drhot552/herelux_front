<template>
  <div class="section">
    <div class="disclaimer">
      <div class="disclaimer__title">
        <h6>
            <router-link class="a_tag" to="/service"> 서비스이용약관 </router-link>
            &nbsp; /  &nbsp;
            <span> <b style="color:#333"> 개인정보취급방지 </b> </span>
            &nbsp; /  &nbsp;
            <router-link class="a_tag" to="/responsibilty"> 책임의 한계 </router-link>
        </h6>
      </div>
      <ul class="ul_style">개인정보 취급방침
        <li class="li_style">
          <p class="p_style">
            herelux가 운영하는 서비스(이하 “사이트”)에서는 이용자의 개인정보를 중요시하며, “정보통신망 이용촉진 및 정보보호 등에 관한 법률” 등 개인 정보와 관련된 법령 상의 개인정보보호규정 및 방송통신위원회가 제정한 “개인정보보호지침”을 준수하고 있으며, 아래와 같이 개인정보 취급방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
            본 방침은 2019년 02월 17일부터 시행됩니다.
          </p>
        </li>
			</ul>
      <ul class="ul_style">1.개인정보의 수집 및 이용 목적
        <li class="li_style">
          <p class="p_style">
            개인정보는 접속정보(구글 애널리틱스) 의미합니다. 당사가 수집한 개인정보는 다음의 목적을 위해 활용합니다.
          </p>
          <p class="p_style">
            (1)구글 애널리틱스를 통해 광고 ROI를 측정할 수 있을 뿐만 아니라 플래시, 동영상 및 소셜 네트워크 사이트와 애플리케이션을 추적하는데에 사용합니다.
          </p>
          <p class="p_style">
            (2)마케팅 및 광고에 활용 신규 서비스 개발과 이벤트 행사에 따른 정보 전달 및 맞춤 서비스 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 접속 빈도 파악 또는 사용자의 서비스 이용에 대한 통계
          </p>
        </li>
			</ul>
      <ul class="ul_style">2.수집하는 개인 정보 항목 및 수집방법
        <li class="li_style">
          <p class="p_style">
            사이트는 원활 사이트 개선을 위해 아래와 같은 개인정보를 수집하고 있습니다.
          </p>
        </li>
			</ul>
      <ul class="ul_style">(1)수집항목
        <li class="li_style">
          <p class="p_style">
            ◎ 구글 애널리틱스에 표시되는 내용들
          </p>
        </li>
			</ul>
      <ul class="ul_style">(2)수집방법
        <li class="li_style">
          <p class="p_style">
            -구글 애널리틱스
          </p>
        </li>
      </ul>
      <ul class="ul_style">(3)수집하는 개인정보의 보유 및 이용기간
        <li class="li_style">
          <p class="p_style">
            -구글 애널리틱스의 정보 보존 정책에 따름
          </p>
        </li>
      </ul>
      <ul class="ul_style">3.개인 정보의 파기절차 및 방법
        <li class="li_style">
          <p class="p_style">
          -구글 애널리틱스의 정보 파기절차에 따름
          </p>
        </li>
      </ul>
      <ul class="ul_style">4.부칙
        <li class="li_style">
          <p class="p_style">
            법령/정책 또는 보안기술의 변경에 따라 내용의 추가/삭제 및 수정이 있을 시에는 변경사항 시행일의 7일전부터 당사 사이트의 공지사항을 통하여 고지합니다.
          </p>
        </li>
      </ul>
      <ul class="ul_style">
        <li class="li_style">
          시행일자 : 2019년 02월 17일
        </li>
      </ul>
    </div>
  </div>

</template>
<script>
export default{
}
</script>

<style>
.disclaimer__title {
    font-weight: 700;
    padding-bottom: 10px;
    text-align: center;
}
.a_tag {
     color: black;
}
.disclaimer {
    padding: 20px;
    background: white;
    color: grey;
}
.ul_style{
  padding-left:0px; padding-right:0px;
}
.li_style{
  opacity:1; list-style-type:none;
}
.p_style{
  font-size:13px;
  color: black;
}
</style>
