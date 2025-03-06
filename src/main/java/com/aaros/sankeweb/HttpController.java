package com.aaros.sankeweb;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

import java.util.ArrayList;

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
    ArrayList<String> players = new ArrayList<>();
    players.add(address);
    players.add("2");
    players.add("3");
    players.add("4");
    model.addAttribute("players", players);
    model.addAttribute("host", true);
    return "mp";
  }
}
