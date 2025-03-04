package com.aaros.sankeweb;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

@Controller
public class HttpController {
  @GetMapping("/")
  public String index() {
    return "index";
  }

  @GetMapping("/sp")
  public String sp() {
    return "sp";
  }

  @GetMapping("/mp")
  public String mp(
      @RequestParam final boolean join,
      Model model
  )
  {
    model.addAttribute("join", join);
    return "lobby";
  }

  @GetMapping("mp/start")
  public String mpStart(
      Model model,
      HttpServletRequest request
  )
  {
    String address = request.getRemoteAddr();
    return "mp";
  }
}
