---
title: 欢迎
type: docs
---

        {{ if not (default true .Params.bookToc) }}
        <!-- nagivation buttons at the top of the body -->
        <div class="fixed-nav" style="top: 0; z-index: 999;">
          <div class="page-navigation" style="display: flex; justify-content: space-between; padding: 0.5rem 1rem;">
                                                        <div class="prev-button" style="flex: 1; text-align: left;">
                                                        {{ if and .Next (ne .Next.Title "") }}
                                                            <a class="btn btn-prev" href="{{ .Next.RelPermalink }}">
                                                            <strong>Previous:</strong> {{ .Next.Title }}
                                                            </a>
                                                        {{ end }}
                                                        </div>
                                                        <div class="next-button" style="flex: 1; text-align: right;">
                                                        {{ if and .Prev (ne .Prev.Title "") }}
                                                            <a class="btn btn-next" href="{{ .Prev.RelPermalink }}">
                                                            <strong>Next:</strong> {{ .Prev.Title }}
                                                            </a>
                                                        {{ end }}
                                                        </div>
          </div>
        </div>
      <!-- Header buttons HTML here -->
      <button class="header-btn">Button 1</button>
      <button class="header-btn">Button 2</button>
      <!-- etc. -->
      {{ end }} 

