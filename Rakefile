# ====================================
#   Rakefile
# ====================================

# ----- Build ----- #

desc 'Build the site'
task :generate do
  puts '-- Generating site --'
  system 'NODE_ENV=production gulp build'
end

# ----- Production ----- #

desc 'Push site to typespecimens.io'
task :push do
  puts '-- Pushing site up via rsync --'
  system 'rsync -avz --delete -e ssh ./build/ john@typespecimens.io:typespecimens.io'
end

desc 'Build site and push to typespecimens.io'
task deploy: [:generate, :push] do
end
