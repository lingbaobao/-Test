<template>
	<div class="system-wrap">
        <div class="logo">
            <img src="../assets/images/logo-blue.png" alt="" class="logo-blue">
            <div class="logoIntro">
                <img src="../assets/images/logo_line.png" alt="" class="login-line">
                <div class="logoInfo">
                    <p>11年大平台</p>
                    <img src="../assets/images/logo_guquan.png" alt="" class="logo-daima">
                </div>
            </div>
        </div>
		<ul>
			<li>
				<router-link :to="{name:''}">
					<img src="../assets/images/erp.png" alt="" class="erp">
					<div class="info">
						<p>erp系统</p>
						<span>员工管理、仓储管理尽在掌握</span>
					</div>
				</router-link>
			</li>
			<li>
				<router-link :to="{name:'index'}">
					<img src="../assets/images/rck.png" alt="" class="rck">
					<div class="info">
						<p>人才库系统</p>
						<span>一览整个公海人才,招聘、捞人应有尽有</span>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>

	export default {
		name: 'Home',
		data() {
			return {
				
			}
		},
		components: {
		
		},
		created() {
			
		}
	}
</script>
