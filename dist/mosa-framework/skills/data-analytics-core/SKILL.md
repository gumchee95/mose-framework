---
description: 核心数据分析技能。用于自动化清洗数据、执行 EDA（探索性分析）并生成支持中文显示的专业图表。
skill_id: DATA_ANALYTICS_CORE
category: Core
---

# Data Analytics Core Skill

## 1. Environment & Setup
当用户请求分析数据时，默认加载以下库：
```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
# 解决中文显示问题 (针对 Windows/Linux 环境)
plt.rcParams['font.sans-serif'] = ['SimHei', 'Arial Unicode MS'] 
plt.rcParams['axes.unicode_minus'] = False