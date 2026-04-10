<#import "template.ftl" as layout>

<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') ; section>

  <#if section = "header">
    <!-- BOAZ-STUDY custom login header -->
    <div style="text-align:center; padding: 1rem 0;">
      <div style="
        display:inline-flex; align-items:center; justify-content:center;
        width:56px; height:56px; border-radius:14px;
        background-color:#1A3C8F; margin-bottom:12px;">
        <span style="color:white; font-size:24px; font-weight:700;">B</span>
      </div>
      <h1 style="color:#1A3C8F; font-size:22px; font-weight:700; margin:0;">
        BOAZ-STUDY
      </h1>
      <p style="color:#6B7280; font-size:13px; margin:4px 0 0;">
        Portail de gestion étudiante
      </p>
    </div>

  <#elseif section = "form">
    <!-- Login form -->
    <form action="${url.loginAction}" method="post">

      <div style="margin-bottom:16px;">
        <label for="username" style="
          display:block; font-size:13px; font-weight:500;
          color:#374151; margin-bottom:6px;">
          Identifiant
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autofocus
          autocomplete="username"
          value="${(login.username!'')}"
          style="
            width:100%; padding:10px 14px; border-radius:10px;
            border:1.5px solid #E5E7EB; font-size:14px;
            outline:none; transition:border-color 0.2s;
          "
          onfocus="this.style.borderColor='#1A3C8F'"
          onblur="this.style.borderColor='#E5E7EB'"
        />
      </div>

      <div style="margin-bottom:24px;">
        <label for="password" style="
          display:block; font-size:13px; font-weight:500;
          color:#374151; margin-bottom:6px;">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          style="
            width:100%; padding:10px 14px; border-radius:10px;
            border:1.5px solid #E5E7EB; font-size:14px;
            outline:none; transition:border-color 0.2s;
          "
          onfocus="this.style.borderColor='#1A3C8F'"
          onblur="this.style.borderColor='#E5E7EB'"
        />
      </div>

      <button type="submit" style="
        width:100%; padding:12px; background-color:#1A3C8F;
        color:white; font-size:14px; font-weight:600;
        border:none; border-radius:10px; cursor:pointer;
        transition:background-color 0.2s;"
        onmouseover="this.style.backgroundColor='#152f72'"
        onmouseout="this.style.backgroundColor='#1A3C8F'"
      >
        Se connecter
      </button>

    </form>
  </#if>

</@layout.registrationLayout>