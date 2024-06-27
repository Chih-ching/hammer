package com.hammer.controller;

import com.hammer.dto.HammerInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;

@Controller
public class HammerController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/hammer")
    public String hammer() {
        return "pages/hammer/hammer";
    }

//    @PostMapping("/hammerRowGroup")
//    public String hammerRowGroup(Model model) throws Exception {
//        return "pages/hammer/hammerList :: .hammerRowGroup";
//    }

    @PostMapping("/hammerList")
    public String hammerList(Model model, @RequestBody ArrayList<HammerInfo> req) throws Exception {
        model.addAttribute("hammerList", req);
        return "pages/hammer/hammerList :: .hammers";
    }

}
